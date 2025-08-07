import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import type { Project } from '@/types/project'

const ShareDialog: React.FC<{
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    projectData?: Project;
}> = ({ isOpen, setOpen, projectData }) => {

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share Project</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">Copy link to share this project.</p>
                <Input readOnly value="https://nebula.ide/project/1234" />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default ShareDialog
