
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";

export default function Messages() {
  const { messages, loading } = useGetMessage();
  console.log(messages);
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        messages.length > 0 &&
        messages.map((message) => {
          <Message key={message._id} message={message} />;
        })
      )}

      <div style={{ minHeight: "calc(92vh - 8vh" }}>
        {/* <Message></Message> */}
        {!loading &&
          messages.length === 
          (
            <div>
              <p className="text-center color-white">Say! Hi</p>
            </div>
          )}
      </div> 
    </>
  );
}
