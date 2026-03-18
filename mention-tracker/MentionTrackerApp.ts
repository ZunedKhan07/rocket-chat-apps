import { App } from '@rocket.chat/apps-engine/definition/App';
import {
    IConfigurationExtend,
    IAppAccessors,
    ILogger,
    IHttp,
    IModify,
    IPersistence,
    IRead
} from '@rocket.chat/apps-engine/definition/accessors';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { IPostMessageSent } from "@rocket.chat/apps-engine/definition/messages";

// --- GLOBAL CONFIG STATE ---
export let isTracking = false;
export const setTracking = (value: boolean) => {
    isTracking = value;
};

// --- SLASH COMMAND CLASS ---
export class ToggleCommand implements ISlashCommand {
    public command = 'ZunedKhan07';
    public i18nParamsExample = 'on_or_off';
    public i18nDescription = 'Toggle mention tracking';
    public providesPreview = false;

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        const args = context.getArguments();
        const sender = context.getSender();
        let message = '';

        if (args[0] === 'on') {
            setTracking(true);
            message = '✅ Tracking enabled for ZunedKhan07';
        } else if (args[0] === 'off') {
            setTracking(false);
            message = '❌ Tracking disabled';
        } else {
            message = 'Use `/ZunedKhan07 on` or `/ZunedKhan07 off`';
        }

        const builder = modify.getCreator().startMessage();
        builder.setSender(sender).setRoom(context.getRoom()).setText(message);
        await modify.getCreator().finish(builder);
    }
}

// --- MESSAGE LISTENER CLASS ---
export class MentionListener implements IPostMessageSent {
    public async executePostMessageSent(message: any, read: IRead, http: IHttp, persistence: IPersistence, modify: IModify) {
        // Agar tracking off hai, toh kuch mat karo
        if (!isTracking) return;

        const text = message.text || '';
        // Apne username ka check
        if (text.includes('zunedkhan07')) {
            const user = message.sender;
            const reply = modify.getCreator().startMessage();
            reply.setRoom(message.room).setSender(user);

            const setting = await read.getEnvironmentReader().getSettings().getValueById('external_logger');

            if (setting) {
                try {
                    const response = await http.post(setting, {
                        data: { userid: user.id, message: text },
                    });
                    const result = response.data;
                    reply.setText(`Mention detected and Logged: ${result?.id || 'Success'}`);
                } catch (err) {
                    reply.setText(`Mention detected, but logging failed 😅`);
                }
            } else {
                reply.setText(`Hey ${user.username}, thanks for the mention! (Tracking is ON)`);
            }
            await modify.getCreator().finish(reply);
        }
    }
}

// --- MAIN APP CLASS ---
export class MentionTrackerApp extends App implements IPostMessageSent {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    // Listener ko activate karne ke liye ye method zaroori hai
    public async executePostMessageSent(message: any, read: IRead, http: IHttp, persistence: IPersistence, modify: IModify): Promise<void> {
        const listener = new MentionListener();
        await listener.executePostMessageSent(message, read, http, persistence, modify);
    }

    protected async extendConfiguration(configuration: IConfigurationExtend): Promise<void> {
        await configuration.slashCommands.provideSlashCommand(new ToggleCommand());
    }
}