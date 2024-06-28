// import {useEffect, useRef, useState} from "react";
//
// export const ChatPage = () => {
//     // const [Message, setMessage] = useState<string[]>([])
//     // let connect = (cb) => {
//     //     console.log('connecting...');
//     //     socket.onopen = () => {
//     //         console.log("connected");
//     //     }
//     //
//     //     socket.onmessage = (msg) => {
//     //         console.log(msg)
//     //     }
//     //
//     //     socket.onclose = (event) => {
//     //         console.log("closed:", event);
//     //     }
//     //
//     //     socket.onerror = (error) => {
//     //         console.log("error:", error);
//     //     }
//     // }
//     //
//     // let sendMessage = (msg : string) => {
//     //     console.log("sending...",msg);
//     //     socket.send(msg)
//     // }
//     //
//     // useEffect(() => {
//     //     connect((msg) => {
//     //         console.log("New Message")
//     //         setMessage(g => [...g,msg])
//     //     })
//     // })
//
//     // let selectedChat = "general"
//     // const changeRoom = () => {
//     //     let newChat = document.getElementById(selectedChat)
//     // }
//     const [message, setMessages] = useState<string[]>([]);
//     const ws = useRef<WebSocket | null>(null)
//
//     useEffect(() => {
//         fetch("http://localhost:4000/room/get", {
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             credentials: "include"
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log(data);
//             })
//             .catch((error) => {
//                 console.error("Error fetching user:", error);
//             });
//     })
//
//     useEffect(() => {
//         if ("WebSocket" in window) {
//
//             ws.current = new WebSocket('ws://localhost:4000/ws/chat?name=lol&roomId=A&roomName=A&clientId=babi');
//
//             ws.current.onopen = () => {
//                 console.log('WebSocket connection established');
//             };
//
//             ws.current.onmessage = (event) => {
//                 const message = event.data;
//                 setMessages(prevMessages => [...prevMessages, message]);
//             };
//
//             ws.current.onclose = () => {
//                 console.log('WebSocket connection closed');
//             };
//
//             ws.current.onerror = (error) => {
//                 console.log('WebSocket error:', error);
//                 // alert(error.code);
//             };
//         }else
//             {
//                 alert("Websocket is not supported by your browser");
//                 return;
//             }
//
//         return () => {
//             if (ws.current) {
//                 ws.current.close();
//             }
//         };
//     }, []);
//
//     return(
//         <div className="center">
//             <h1>Amazing Chat Application</h1>
//             <h3 id="chat-header">Currently in chat: general</h3>
//             <h3 id="connection-header">Connected to Websocket: false</h3>
//
//             <form id="chatroom-selection">
//                 <label htmlFor="chatroom">Chatroom:</label>
//                 <input type="text" id="chatroom" name="chatroom"/><br/><br/>
//                 <input type="submit" value="Change chatroom"/>
//             </form>
//             <br/>
//             <textarea className="messagearea" id="chatmessages" readOnly name="chatmessages"
//                       placeholder="Welcome to the general chatroom, here messages from others will appear"></textarea>
//
//             <br/>
//             <form id="chatroom-message">
//                 <label htmlFor="message">Message:</label>
//                 <input type="text" id="message" name="message"/><br/><br/>
//                 <input type="submit" value="Send message"/>
//             </form>
//         </div>
//     )
//
// }
//
