from flask import Flask, request, jsonify , make_response
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps
from flask_cors import CORS, cross_origin

db = SQLAlchemy()
app = Flask(__name__)
CORS(app, origins='*')

app.config['SECRET_KEY'] = 'thisissecret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///store.db'

db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(100))
    password = db.Column(db.String(80))
    admin = db.Column(db.Boolean)
    email = db.Column(db.String(200))
    blocked = db.Column(db.Boolean)

class Store(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    description = db.Column(db.String(300))
    address = db.Column(db.String(200))
    city = db.Column(db.String(200))
    province = db.Column(db.String(200))
    postal_code = db.Column(db.String(200))
    contact_person = db.Column(db.String(200))
    contact_number = db.Column(db.String(30))
    email = db.Column(db.String(200))
    user_id = db.Column(db.Integer)

class Inventory(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    item_code = db.Column(db.String(300))
    item_description = db.Column(db.String(300))
    cost = db.Column(db.Float)
    price = db.Column(db.Float)
    quantity = db.Column(db.Integer)
    store_id = db.Column(db.Integer)
    user_id = db.Column(db.Integer)

# with app.app_context():
#     db.create_all()

# decorator function start 
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            # Extract Token
            bearer = request.headers.get('Authorization')
            token = bearer.split(" ")[1]

        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            # Decode Token
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.filter_by(id=data['id']).first()
        except jwt.exceptions.InvalidSignatureError:
            return jsonify({'message': 'Token is invalid'}), 401

        return f(current_user, *args, **kwargs)

    return decorated


def allow_cross_origin(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        response = make_response(func(*args, **kwargs))
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers['Access-Control-Allow-Origin']='http://localhost:3000'
        response.headers['Access-Control-Allow-Methods']='GET, POST, PUT, OPTIONS'
        response.headers["Access-Control-Allow-Headers"]="Access-Control-Request-Headers,Access-Control-Allow-  Methods,Access-Control-Allow-Headers,Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept,supports_credentials=True"
        return response
    return wrapper

# User api endpoints start 

# Get all the Users 
@app.route('/get-users', methods=["GET"])
@allow_cross_origin
@token_required
def get__users(current_user):

    if not current_user.admin:
        return jsonify({'message' : 'Cannot perform that function!'})

    user_model  = User.query.all()

    output = []

    for user in user_model:
        user_data = {}
        user_data['id'] = user.id
        user_data['username'] = user.username
        user_data['email'] = user.email
        user_data['password'] = user.password
        user_data['admin'] = user.admin
        user_data['blocked'] = user.blocked
        output.append(user_data)

    resp = jsonify({'users' : output})
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp, 200

# view user 
@app.route('/view-user/<user_id>', methods=["GET"])
@token_required
def view_user(current_user, user_id):

    if not current_user.admin:
        return jsonify({'message' : 'Cannot perform that function!'}), 401

    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({'message' : 'No user found!'}), 400

    user_data = {}
    user_data['id'] = user.id
    user_data['username'] = user.username
    user_data['email'] = user.email
    user_data['password'] = user.password
    user_data['admin'] = user.admin
    user_data['blocked'] = user.blocked

    return jsonify({'user' : user_data})

# Create User 
@app.route('/add-user', methods=["POST"])
@token_required
def add_user(current_user):

    if not current_user.admin:
        return jsonify({'message' : 'Cannot perform that function!'})

    data = request.get_json()
    hashed_password = generate_password_hash(data['password'],method='sha256')
    
    new_user = User(username=data['username'],password=hashed_password, admin=data['admin'], email=data['email'], blocked=False)
    db.session.add(new_user)
    db.session.commit()

    user_data = {}
    user_data['username'] = new_user.username
    user_data['password'] = new_user.password

    return jsonify({'message': 'success!', 'user': user_data}), 200

# Update User 
@app.route('/update-user/<user_id>', methods=["PUT"])
@token_required
def update_user(current_user, user_id):

    if not current_user.admin:
        return jsonify({'message' : 'Cannot perform that function!'})


    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({'message' : 'No user found!'}), 400

    user.username = request.json.get('username', user.username)
    user.email = request.json.get('email', user.email)
    user.admin = request.json.get('admin', user.admin)
    user.blocked = request.json.get('blocked', user.blocked)

    db.session.commit()

    return jsonify({'message' : 'Success!', 'user': {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'admin': user.admin,
        'blocked': user.blocked
    }})

# Delete User 
@app.route('/delete-user/<user_id>', methods=["DELETE"])
@token_required
def delete_user(current_user, user_id):

    if not current_user.admin:
        return jsonify({'message' : 'Cannot perform that function!'})

    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({'message' : 'No user found!'}), 400

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message' : 'The user has been deleted!'}), 200


# Login route 
def check_auth(username, password):
    user = User.query.filter_by(username=username).first()
    if not user:
        return False
    if check_password_hash(user.password, password):
        return True
    return False

def authenticate():
    return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

@app.route('/login',  methods=["POST"])
@allow_cross_origin
def login():
    data = request.get_json() or request.form

    if not data or not 'username' in data or not 'password' in data:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    username = data.get('username')
    password = data.get('password')
    
    if check_auth(username, password):
        user = User.query.filter_by(username=username).first()

        user_info = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
            'admin': user.admin,
            'username' : user.username
        }

        token = jwt.encode(user_info, app.config['SECRET_KEY'])
    
        user_data = {}
        user_data['id'] = user.id
        user_data['username'] = user.username
        user_data['email'] = user.email
        user_data['password'] = user.password
        user_data['admin'] = user.admin
        user_data['blocked'] = user.blocked
        user_data['token'] = token.decode('UTF-8')
        user_data['isAuthenticated'] = True
        
        response = jsonify({'user_data': user_data})
        response.set_cookie('token', token)
        response.headers["Authorization"] = f"Bearer {token}"
        return response
        
    return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})



# Stores endpoints 

# get all stores 
@app.route('/get-stores', methods=["GET"])
@allow_cross_origin
@token_required
def get_all_stores(current_user):
    if current_user.admin == True:
        get_stores = Store.query.all()
    else:
        get_stores = Store.query.filter_by(user_id=current_user.id).all()

    output = []

    for store in get_stores:
        store_data = {}
        store_data['id'] = store.id
        store_data['description'] = store.description
        store_data['address'] = store.address
        store_data['city'] = store.city
        store_data['province'] = store.province
        store_data['postal_code'] = store.postal_code
        store_data['contact_person'] = store.contact_person
        store_data['contact_number'] = store.contact_number
        store_data['email'] = store.email
        store_data['user_id'] = store.user_id
        output.append(store_data)

    # return jsonify({'stores' : output})
    resp = jsonify({'stores' : output})
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp, 200

# view store 
@app.route('/view-store/<store_id>', methods=["GET"])
@token_required
def view_store(current_user, store_id):

    if current_user.admin == True:
        store = Store.query.filter_by(id=store_id).first()
    else:
        store = Store.query.filter_by(id=store_id, user_id=current_user.id).first()

    if not store:
        return jsonify({'message' : 'No Store found!'})

    store_data = {}
    store_data['id'] = store.id
    store_data['description'] = store.description
    store_data['address'] = store.address
    store_data['city'] = store.city
    store_data['province'] = store.province
    store_data['postal_code'] = store.postal_code
    store_data['contact_person'] = store.contact_person
    store_data['contact_number'] = store.contact_number
    store_data['email'] = store.email
    store_data['user_id'] = store.user_id

    inventory_items = Inventory.query.filter_by(store_id=store_id, user_id=current_user.id).all()
    inventory_data = []
    for item in inventory_items:
        item_data = {}
        item_data['id'] = item.id
        item_data['item_description'] = item.item_description
        item_data['cost'] = item.cost
        item_data['price'] = item.price
        item_data['item_code'] = item.item_code
        inventory_data.append(item_data)

    store_data['inventory_items'] = inventory_data

    return jsonify(store_data), 200

# add a store 
@app.route('/add-store', methods=["POST"])
@token_required
@allow_cross_origin
def add_store(current_user):
    data = request.get_json()
    add_store = Store(
        description=data['description'], 
        address=data['address'],
        city=data['city'],
        province=data['province'],
        postal_code=data['postal_code'],
        contact_person=data['contact_person'],
        contact_number=data['contact_number'],
        email=data['email'],
        user_id=data['user_id'],
        )
    db.session.add(add_store)
    db.session.commit()

    return jsonify({'message' : "Store Added!"})

# Update a store 
@app.route('/update-store/<store_id>', methods=["PUT"])
@token_required
def update_store(current_user, store_id):

    if current_user.admin == True:
        store = Store.query.filter_by(id=store_id).first()
    else:
        store = Store.query.filter_by(id=store_id, user_id=current_user.id).first()

    if not store:
        return jsonify({'message' : 'No Store found!'})


    store.description = request.json.get('description', store.description)
    store.address = request.json.get('address', store.address)
    store.city = request.json.get('city', store.city)
    store.province = request.json.get('province', store.province)
    store.user_id = request.json.get('user_id', store.user_id)
    store.postal_code = request.json.get('postal_code', store.postal_code)
    store.contact_person = request.json.get('contact_person', store.contact_person)
    store.contact_number = request.json.get('contact_number', store.contact_number)
    store.email = request.json.get('email', store.email)
    db.session.commit()
    
    return jsonify({'message' : 'Store has been updated!'})

# Delete a store 
@app.route('/delete-store/<store_id>', methods=["DELETE"])
@token_required
def delete_store(current_user, store_id):
    if current_user.admin == True:
        store = Store.query.filter_by(id=store_id).first()
    else:
        store = Store.query.filter_by(id=store_id, user_id=current_user.id).first()

    if not store:
        return jsonify({'message' : 'No Store found!'})
    
    db.session.delete(store)
    db.session.commit()

    return jsonify({'message' : 'store deleted!'}), 200


# Inventory section start  
# add Inventory 
@app.route('/add-inventory', methods=["POST"])
@token_required
def add_inventory(current_user):
    data = request.get_json()
    add_inventory = Inventory(
        item_description=data['item_description'], 
        cost=data['cost'],
        price=data['price'],
        store_id=data['store_id'],
        item_code=data['item_code'],
        
        )
    db.session.add(add_inventory)
    db.session.commit()

    return jsonify({'message' : "success!"}), 200 

@app.route('/view-item/<inventory_id>',methods=["GET"])
@token_required
def view_item(current_user, inventory_id):

    if current_user.admin == True:
        inventory = Inventory.query.filter_by(id=inventory_id).first()
    else:
        inventory = Inventory.query.filter_by(id=inventory_id, user_id=current_user.id).first()

    if not inventory:
        return jsonify({'message' : 'No inventory found!'})

    inventory_data = {}
    inventory_data['id'] = inventory.id
    inventory_data['item_code'] = inventory.item_code
    inventory_data['cost'] = inventory.cost
    inventory_data['price'] = inventory.price
    inventory_data['store_id'] = inventory.store_id
    inventory_data['user_id'] = inventory.user_id
    inventory_data['item_description'] = inventory.item_description

    return jsonify(inventory_data)

@app.route('/update-item/<inventory_id>',methods=["PUT"])
@token_required
@allow_cross_origin
def update_item(current_user, inventory_id):
    if current_user.admin == True:
        inventory = Inventory.query.filter_by(id=inventory_id).first()
    else:
        inventory = Inventory.query.filter_by(id=inventory_id, user_id=current_user.id).first()

    if not inventory:
        return jsonify({'message' : 'No inventory found!'})

    inventory.id = request.json.get('id', inventory.id)
    inventory.item_code = request.json.get('item_code', inventory.item_code)
    inventory.cost = request.json.get('cost', inventory.cost)
    inventory.price = request.json.get('price', inventory.price)
    inventory.store_id = request.json.get('store_id', inventory.store_id)
    inventory.item_description = request.json.get('item_description', inventory.item_description)
    db.session.commit()
    
    return jsonify({'message' : "Item has been updated!"})


@app.route('/get-items', methods=["GET"])
@token_required
def get_items(current_user):
    if current_user.admin == True:
        get_inventory = Inventory.query.all()
    else:
        get_inventory = Inventory.query.filter_by(user_id=current_user.id).all()

        if not get_inventory:
            return jsonify({'message' : 'No inventory found!'})

    output = []

    for inventory in get_inventory:
        inventory_data = {}
        inventory_data['id'] = inventory.id
        inventory_data['item_description'] = inventory.item_description
        inventory_data['item_code'] = inventory.item_code
        inventory_data['cost'] = inventory.cost
        inventory_data['price'] = inventory.price
        inventory_data['store_id'] = inventory.store_id
        inventory_data['user_id'] = inventory.user_id
        output.append(inventory_data)

    # return jsonify({'stores' : output})
    resp = jsonify({'inventory' : output})
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp, 200


if __name__ == '__main__':
    app.run(debug=True)