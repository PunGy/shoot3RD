import GameProcess, { Keymap } from '@src/engine/GameProcess'

export interface ControllableObject
{
    _type: 'controllable';
    focus: () => void;
    keymap: Keymap;
}

export const controllableObjectDefaults: Partial<ControllableObject> = {
    _type: 'controllable',

    focus()
    {
        GameProcess.setKeymap(this.keymap)
    },
}
