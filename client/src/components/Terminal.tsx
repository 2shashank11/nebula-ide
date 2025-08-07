import { useEffect, useImperativeHandle, useRef, forwardRef } from 'react'
import { Terminal as XTerminal } from '@xterm/xterm'
import { FitAddon } from 'xterm-addon-fit'
import {createTerminalSocket} from '@/socket'
import { useTerminalSocket } from '@/context/TerminalSocketContext'
import '@xterm/xterm/css/xterm.css'
import { toast } from 'sonner'

export type TerminalHandle = {
  fit: () => void
}

type TerminalProps = {
  projectId: string
}

const Terminal = forwardRef<TerminalHandle, TerminalProps>(({ projectId }, ref) => {
  const { socket } = useTerminalSocket()

  const terminalRef = useRef<HTMLDivElement | null>(null)
  const fitAddon = useRef(new FitAddon())
  const isRendered = useRef(false)
  const socketRef = useRef<any>(null)

  // console.log("Project ID", projectId)

  useImperativeHandle(ref, () => ({
    fit: () => fitAddon.current.fit(),
  }))

  useEffect(() => {
    if (!socket) {
      return
    }

    if (isRendered.current) return

    isRendered.current = true
    const term = new XTerminal({
      cursorBlink: true,
      fontSize: 14,
    })

    term.loadAddon(fitAddon.current)

    if (terminalRef.current) {
      term.open(terminalRef.current)
    }

    fitAddon.current.fit()

    window.addEventListener('resize', () => fitAddon.current.fit())

    socketRef.current = socket

    term.onData((data) => {
      socket.emit('terminal:write', data)
    })

    function onTerminalData(data: string){
      term.write(data)
    }

    socket.on('terminal:data', onTerminalData)

    return () => {
      socket.off('terminal:data')
    }

  }, [socket])

  return <div ref={terminalRef} className="h-full w-full scrollbar-custom" />
})

export default Terminal
