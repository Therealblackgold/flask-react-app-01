import SectionHeading from "../../components/SectionHeading";
import User from "./User";
import { useGetUsersQuery } from "./usersApiSlice";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    // Extra fields that refetch data at certain intervals
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  // if state is loading display spinner
  if (isLoading) content = <p>Loading...</p>;

  // if state error display error message
  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    // destructuring ids from users data
    const { ids } = users;

    // making sure we have ids.length before mapping
    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;

    content = (
      <>
        <SectionHeading title="users" />
        <section className="container text-center mt-5 bg-light table-component py-5">
          <div className="row bg-white px-0 mx-0 py-3 table-row-style align-items-items">
            <div className="col-1"></div>
            <div className="col fw-bold">username</div>
            <div className="col fw-bold">email</div>
            <div className="col fw-bold">admin role</div>
            <div className="col fw-bold">blocked status</div>
            <div className="col-1"></div>
            <div className="col-1"></div>
          </div>
          <hr />
          {tableContent}
        </section>
      </>
    );
  }
  return content;
};

export default UsersList;
