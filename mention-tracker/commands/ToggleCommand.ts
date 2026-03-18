
//   NOTE: This file is currently commented out to avoid Windows-specific 
//   build path resolution errors in the Rocket.Chat Apps-Engine bundler.
//   The active code has been moved to the main MentionTrackerApp.ts 
//   to ensure a successful build during the prototype phase.
 


// import {
//     IHttp,
//     IModify,
//     IPersistence,
//     IRead
// } from '@rocket.chat/apps-engine/definition/accessors';
// import { 
//     ISlashCommand, 
//     SlashCommandContext 
// } from '@rocket.chat/apps-engine/definition/slashcommands';
// import { setTracking } from '../AppConfig';

// export class ToggleCommand implements ISlashCommand {
//     public command = 'ZunedKhan07';
//     public i18nParamsExample = 'on_or_off';
//     public i18nDescription = 'Toggle mention tracking';
//     public providesPreview = false;

//     // IPersistence ko arguments mein add kiya gaya hai
//     public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
//         const args = context.getArguments();
//         const sender = context.getSender();
//         let message = '';

//         if (args[0] === 'on') {
//             setTracking(true);
//             message = 'Tracking enabled';
//         } else if (args[0] === 'off') {
//             setTracking(false);
//             message = 'Tracking disabled';
//         } else {
//             message = 'Use /ZunedKhan07 on or off';
//         }

//         const builder = modify.getCreator().startMessage();
//         builder.setSender(sender);
//         builder.setRoom(context.getRoom());
//         builder.setText(message);

//         await modify.getCreator().finish(builder);
//     }
// }