"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Loader } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useState, useEffect } from "react"
import { getEnvironments } from "@/api/projects"
import { useDispatch, useSelector } from "react-redux"
import { setEnvironments } from "@/features/project/environmentSlice"
import type { RootState, AppDispatch } from "@/app/store"

export function EnvironmentSelectbox(props: {
  envValue: string
  setEnvValue: React.Dispatch<React.SetStateAction<string>>
}) {
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const environments = useSelector(
    (state: RootState) => state.environment.environments
  )

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetchEnvironments = async () => {
      if (environments && environments.length > 0) return;

      setIsLoading(true)
      const response = await getEnvironments()
      if (response.status === 200) {
        dispatch(setEnvironments(response.data))
      } else {
        console.error("Failed to fetch environments")
      }
      setIsLoading(false)
    }

    fetchEnvironments()
  }, [dispatch, environments])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-10">
        <Loader className="h-4 w-4 animate-spin" />
      </div>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {props.envValue
            ? environments?.find((env) => env.environment === props.envValue)?.envLabel
            : "Select environment..."}
          <ChevronsUpDown className="opacity-50 ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search environment..." className="h-9 " />
          <CommandList>
            <CommandEmpty>No environment found.</CommandEmpty>
            <CommandGroup>
              {environments?.map((env) => (
                <CommandItem
                  key={env.id}
                  value={env.environment}
                  onSelect={(currentValue) => {
                    props.setEnvValue(
                      currentValue === props.envValue ? "" : currentValue
                    )
                    setOpen(false)
                  }}
                >
                  <span className="font-medium">
                    <img
                      src={env.icon}
                      alt={env.envLabel}
                      className="mr-2 h-4 w-4 inline-block"
                    />
                  </span>
                  {env.envLabel}
                  <Check
                    className={cn(
                      "ml-auto",
                      props.envValue === env.environment ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
