import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import type { Project } from '@/types/project'
import { updateProject } from '@/api/projects'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/app/store'
import { updateProjectData } from '@/features/project/projectSlice'
import { toast } from 'sonner'

interface SettingsDialogProps {
  isOpen: boolean
  setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>
  projectData: Project
  onSave?: (updatedProject: Project) => void // optional callback
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  isOpen,
  setOpenSettings,
  projectData,
}) => {
  const [data, setData] = useState<Project>(projectData)

  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try{
        const response = await updateProject(data)
        console.log('Project updated successfully:', response)
        dispatch(updateProjectData(data)) 
        toast.success(response.data.message || 'Project updated successfully!')
    }
    catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to update project.')
    }
    setOpenSettings(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpenSettings}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Project Settings</DialogTitle>
            <DialogDescription>
              Modify your project details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <Label htmlFor="name">Project Name</Label>
            <Input id="name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} required />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SettingsDialog
