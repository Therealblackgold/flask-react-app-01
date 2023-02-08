import React from "react";
import { Link } from "react-router-dom";
<Link></Link>;
const Public = () => {
  return (
    <section style={{ padding: "4rem" }} className="public">
      <header>
        <h1>
          smart manager dolor <span className="nowrap">sit amet</span>
        </h1>
      </header>
      <main className="public__main">
        <p className="lead">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non magnam
          sunt odio perferendis, repellendus hic est sapiente dignissimos quam,
          amet cum, similique esse mollitia tempora nam doloribus qui quidem
          commodi!
        </p>
        <address className="public__addr">Lorem ipsum dolor sit.</address>
      </main>
      <footer>
        <Link to="login" className="btn btn-success">
          user login
        </Link>
      </footer>
    </section>
  );
};

export default Public;
