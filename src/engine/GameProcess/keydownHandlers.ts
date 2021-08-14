type keydownEventListener = (ev: WindowEventMap['keydown']|HTMLElementEventMap['keydown']) => void
export const nodelayKeydown = <T extends {
    addEventListener: (
        type: 'keydown'|'keyup',
        listener: keydownEventListener,
    ) => void;
}>(elem: T, listener: keydownEventListener, type: 'multiple' | 'one', repeatSpeed = 70) =>
{
    const keyboardEvents: Map<string, KeyboardEvent> = new Map()
    let intervalId: number | null = null

    elem.addEventListener('keydown', (event) =>
    {
        if (!keyboardEvents.has(event.code))
            keyboardEvents.set(event.code, event)

        if (intervalId == null)
        {
            intervalId = (setInterval as Window['setInterval'])(() =>
            {
                if (type === 'multiple')
                {
                    keyboardEvents.forEach(listener)
                }
                else
                {
                    let i = 1
                    for (event of keyboardEvents.values())
                        if (i++ === keyboardEvents.size) listener(event)
                }
            }, repeatSpeed)
        }
    })
    elem.addEventListener('keyup', ({ code }) =>
    {
        keyboardEvents.delete(code)
        if (keyboardEvents.size === 0)
        {
            clearInterval(intervalId)
            intervalId = null
        }
    })
}

