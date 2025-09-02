"use client"
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface FormModalProps {
  title: string
  triggerTitle: string
  children: React.ReactNode
}

const FormModal = ({ title, triggerTitle, children }: FormModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{triggerTitle}</Button>
      </DialogTrigger>
      <DialogContent aria-describedby="">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default FormModal
