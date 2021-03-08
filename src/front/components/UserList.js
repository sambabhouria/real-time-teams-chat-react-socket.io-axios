import React, { Component } from "react";
import { ChatList } from "react-chat-elements";
import FormControl from "react-bootstrap/lib/FormControl";
import FormGroup from "react-bootstrap/lib/FormGroup";


import img1 from "../static/images/avatar/1.jpg";
import img2 from "../static/images/avatar/2.jpg";
import img3 from "../static/images/avatar/3.jpg";
import img4 from "../static/images/avatar/4.jpg";
import img5 from "../static/images/avatar/5.jpg";
import img6 from "../static/images/avatar/6.jpg";
import img7 from "../static/images/avatar/7.jpg";

const arrayOfImage = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7
]


/**
 *
 * Renders user list
 *
 * Used on both places Sign-in modal and as ChatList
 */

export default class UserList extends Component {
  state = {
    userData: [],
    searchQuery: null
  };
  componentDidMount() {}
  searchInput(e) {
    let value = e.target.value;
    let searchQuery = null;
    if (value) {
      searchQuery = value;
    }
    this.setState({ searchQuery });
  }
  /**
   *
   * Implement filter logic on basis of search query.
   */
  getFilteredUserList() {
    return !this.state.searchQuery
      ? this.props.userData
      : this.props.userData.filter(user =>
          user.name.toLowerCase().includes(this.state.searchQuery.toLowerCase())
        );
  }
  render() {
    let users = this.getFilteredUserList();
    return (
      <div>
        <FormGroup>
          <FormControl
            type="text"
            placeholder="Search for a user here..."
            onInput={this.searchInput.bind(this)}
          />
        </FormGroup>
        {users.length ? (
          <ChatList
            className={!this.props.showSignInList ? "chat-list" : "user-list"}
            dataSource={users.map((f, i) => {
              // console.log("user", f.id, i);
              let date = null;
              let subtitle = "";
              if (
                !this.props.showSignInList &&
                f.messages &&
                f.messages.length
              ) {
                let lastMessage = f.messages[f.messages.length - 1];
                date = new Date(lastMessage.timeStamp);
                subtitle =
                  (lastMessage.position === "right" ? "You: " : f.name + ": ") +
                  lastMessage.text;
              }
              return {
                //  avatar:  require(`../static/images/avatar/${f.id}.jpg`),
                 avatar: arrayOfImage[f.id],
                alt: f.name,
                title: f.name,
                subtitle: subtitle,
                date: date,
                unread: f.unread,
                user: f
              };
            })}
            onClick={
              !this.props.showSignInList
                ? this.props.onChatClicked
                : this.props.onUserClicked
            }
          />
        ) : (
          <div className="text-center no-users">No users to show.</div>
        )}
      </div>
    );
  }
}
