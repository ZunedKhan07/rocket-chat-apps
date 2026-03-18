



// import { 
//     IHttp,
//     IModify,
//     IPersistence,
//     IRead
// } from "@rocket.chat/apps-engine/definition/accessors";

// import { IPostMessageSent } from "@rocket.chat/apps-engine/definition/messages";

// export class MentionListener implements IPostMessageSent {

//     public async executePostMessageSent(
//         message: any,
//         read: IRead,
//         http: IHttp,
//         persistence: IPersistence,
//         modify: IModify
//     ) {

//         const text = message.text || '';

//         // ✅ mention check
//         if (text.includes('zunedkhan07')) {

//             const user = message.sender;

//             const reply = modify.getCreator().startMessage();
//             reply.setRoom(message.room);
//             reply.setSender(user);

//             // ✅ external logger (optional)
//             const setting = await read
//                 .getEnvironmentReader()
//                 .getSettings()
//                 .getValueById('external_logger');

//             if (setting) {
//                 try {
//                     const response = await http.post(setting, {
//                         data: {
//                             userid: user.id,
//                             message: text,
//                         },
//                     });

//                     const result = response.data;

//                     reply.setText(`${result?.result || 'Logged'} (${result?.id || 'no-id'})`);
//                 } catch (err) {
//                     reply.setText(`Mention detected, but logging failed 😅`);
//                 }
//             } else {
//                 // ✅ default reply
//                 reply.setText(`Thank you for mentioning me, ${user.username}`);
//             }

//             await modify.getCreator().finish(reply);
//         }
//     }
// }