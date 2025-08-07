import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Download, EllipsisVertical, Settings2, Share2, Trash } from 'lucide-react'

import SettingsDialog from './project-card-dialog/SettingsDialog'
import ShareDialog from './project-card-dialog/ShareDialog'
import DownloadDialog from './project-card-dialog/DownloadDialog'
import DeleteDialog from './project-card-dialog/DeleteDialog'
import type { Project } from '@/types/project'

const ProjectCardsDropdown: React.FC<{ projectData: Project }> = ({ projectData }) => {
  const [openSettings, setOpenSettings] = useState(false)
  const [openShare, setOpenShare] = useState(false)
  const [openDownload, setOpenDownload] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  return (
    <>
      <SettingsDialog isOpen={openSettings} setOpenSettings={setOpenSettings} projectData={projectData} />
      <ShareDialog isOpen={openShare} setOpen={setOpenShare} projectData={projectData} />
      <DownloadDialog isOpen={openDownload} setOpen={setOpenDownload} projectData={projectData} />
      <DeleteDialog isOpen={openDelete} setOpen={setOpenDelete} projectData={projectData} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <EllipsisVertical className='size-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpenSettings(true)}>
            <Settings2 className="mr-2 size-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenShare(true)}>
            <Share2 className="mr-2 size-4" />
            Share
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDownload(true)}>
            <Download className="mr-2 size-4" />
            Download
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)} className="text-red-600">
            <Trash className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default ProjectCardsDropdown
