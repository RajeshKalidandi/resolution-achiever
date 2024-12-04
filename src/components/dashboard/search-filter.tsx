'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'

interface SearchFilterProps {
  onSearch: (query: string) => void
  onCategoryChange: (category: string) => void
  onStatusChange: (status: string) => void
}

export function SearchFilter({
  onSearch,
  onCategoryChange,
  onStatusChange,
}: SearchFilterProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
        <Input
          placeholder="Search resolutions..."
          className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-700 pl-8"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <Select onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[180px] bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-700">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="health">Health & Fitness</SelectItem>
          <SelectItem value="career">Career</SelectItem>
          <SelectItem value="personal">Personal</SelectItem>
          <SelectItem value="finance">Finance</SelectItem>
          <SelectItem value="education">Education</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px] bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-700">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="not_started">Not Started</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
