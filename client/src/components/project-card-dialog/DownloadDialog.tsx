import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import type { Project } from '@/types/project'
import { toast } from 'sonner'

const DownloadDialog: React.FC<{
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    projectData?: Project;
}> = ({ isOpen, setOpen, projectData }) => {

    const handleDownload = async() => {
        try{
            console.log("Downloading Data", projectData)
            toast.success('Project download initiated!')
        }
        catch (error: any) {
            console.error('Download failed:', error);
            toast.error(error.response?.data?.message || 'Failed to download project.');
        }
        finally {
            setOpen(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Download Project</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">
                    Are you sure you want to download this project? A .zip file will be generated.
                </p>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="button" onClick={handleDownload}>Download</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default DownloadDialog
