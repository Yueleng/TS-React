import ReactDOM from "react-dom";
// import EventComponent from "./events/EventComponent";
// import GuestList from "./state/GuestList";
// import UserSearch from "./state/UserSearch";
// import UserSearch from "./classes/UserSearch";
import UserSearch from "./refs/UserSearch";

const App = () => {
  return (
    <div>
      {/* <GuestList /> */}
      {/* <EventComponent /> */}
      {/* <UserSearch
        users={[
          { name: "Sarah", age: 20 },
          { name: "Alex", age: 20 },
          { name: "Micheal", age: 20 },
        ]}
      /> */}
      <div>
        <UserSearch />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
