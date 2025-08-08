import { ChevronRight, Play, Check, Hourglass } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { useTerminalSocket } from '@/context/TerminalSocketContext'
import { getFileLanguage } from '@/lib/languages'

type EditorHeaderProps = {
    selectedFile: string
    saved: boolean
}

const EditorHeader = ({ selectedFile, saved }: EditorHeaderProps) => {

    const {socket} = useTerminalSocket()

    const handleExecuteCode = () => {
        if(!selectedFile || !socket) return;
        
        if (socket) {
            const fileName = selectedFile.split('/').pop() || '';
            const extension = fileName.split('.')[1] || '';
            const language = getFileLanguage(extension);
            socket.emit('code:execute', { filePath: selectedFile, language: language });
        }

    }

    return (
        <div>

            {selectedFile && (
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground font-medium px-2 py-1 overflow-x-auto whitespace-nowrap">
                        {selectedFile.slice(1).split("/").map((segment, index, arr) => (
                            <div key={index} className="flex items-center">
                                <span className={index === arr.length - 1 ? "font-semibold text-foreground" : "text-muted-foreground"}>
                                    {segment}
                                </span>
                                {index < arr.length - 1 && (
                                    <span className="mx-1 text-muted-foreground"><ChevronRight size={15} /></span>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 mr-3">
                        <div>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    handleExecuteCode()
                                }}
                            >
                                <Play size={10} />
                            </Button>
                        </div>
                        <div>
                            {selectedFile !== "" && saved ? (
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Check size={12} className="text-green-500" />
                                    Saved
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Hourglass size={12} className="animate-spin text-yellow-500" />
                                    Saving...
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default EditorHeader