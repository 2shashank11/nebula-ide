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
import { deleteProject } from '@/api/projects'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/app/store'
import { deleteProjectData } from '@/features/project/projectSlice'

const DeleteDialog: React.FC<{
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    projectData?: Project;
}> = ({ isOpen, setOpen, projectData }) => {

    const dispatch = useDispatch<AppDispatch>()
    
    const handleDelete = async() => {
        if (!projectData) {
            toast.error('No project data available to delete.');
            return;
        }
        try{
            const response = await deleteProject(projectData.id)
            dispatch(deleteProjectData(projectData.id))
            toast.success(response.data.message || 'Project deleted successfully!');
        }
        catch (error: any) {
            console.error('Delete failed:', error);
            toast.error(error.response?.data?.message || 'Failed to delete project.');
        }
        finally {
            setOpen(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete Project</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">
                    Are you sure you want to delete this project? This action cannot be undone.
                </p>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default DeleteDialog
