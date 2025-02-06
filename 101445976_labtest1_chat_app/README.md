# COMP3133 Fullstack Labtest

## Real-time Chat App

This is a real-time chat application where users can sign up, log in, join group chats, send messages, and leave groups. Below is a step-by-step guide to how the app works.

---

### Welcome Page

The welcome page contains two buttons:
- **Login**
- **Sign Up**

![Screenshot 1](/sceenshots/welcompage.png)

---

### Signup

Users can sign up by entering their **Username**, **First Name**, **Last Name**, and **Password**. After filling in the required fields, click **Register**. There is also a link at the bottom that redirects users back to the login page if they already have an account.

![Signup](/sceenshots/signup.png)

Once the registration is successful, a notification will pop up confirming the account creation.

![Signup2](/sceenshots/signuppopup.png)

Here’s the database showing the newly created user:

![User database](/sceenshots/databaseuser.png)

---

### Login

Users can log in by entering their **Username** and **Password**.

![Login](/sceenshots/login.png)

---

### Join Chat Page

After logging in, users are directed to the homepage, where they can join group chats. There are three available group chat options:
1. **General**
2. **Tech**
3. **Gaming**

![Join chat page](/sceenshots/joinchat.png)

![Option group Chat](/sceenshots/optionchat.png)

Here’s the database showing the available rooms:

![Room database](/sceenshots/roomsdatabase.png)

---

### Chat Room - Group Messages

In the chat room, users can see the room name and the members currently joined. Since only one user (myself) is in the room, you will see only my name. Users can type messages into the chat box, and these messages will be saved to the database.

Here are some screenshots of the group messages:

![Group message](/sceenshots/Groupmessage1'.png)

![Group message](/sceenshots/Groupmessage2.png)

![Group message](/sceenshots/groupmessage3.png)

The database stores the **Username**, **Room**, **Message**, and **Timestamp** of each chat message.

![Group message](/sceenshots/chatdatabaseinfo.png)

![Group message](/sceenshots/groupmessage4.png)

![Group message](/sceenshots/groupmessage4.png)

![Group message](/sceenshots/chatdatabaseinfo2.png)

---

### Leave Group

Users have the option to leave a group. When you click **Leave Group**, you will be redirected back to the Join Room page.

![Leave group](/sceenshots/leavegroup.png)

---

### Log Out

In the Join Room page, there is a **Log Out** option for users. Clicking this will log the user out and take them back to the Welcome page.

![Log out](/sceenshots/logout1.png)

![Log out - Return to Home](/sceenshots/logoutgobackhomepage.png)

---

This README provides a detailed guide on how the real-time chat application works. Users can sign up, log in, join chat rooms, send messages, and manage their accounts with ease. Enjoy exploring the app!
