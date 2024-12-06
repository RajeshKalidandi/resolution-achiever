'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlusCircle, MinusCircle } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SavingsCategory {
  name: string
  amount: number
  frequency: 'daily' | 'weekly' | 'monthly'
}

interface SavingsCalculatorProps {
  initialDailyAmount: number
  onUpdate: (dailyAmount: number) => void
}

export function SavingsCalculator({ initialDailyAmount, onUpdate }: SavingsCalculatorProps) {
  const [categories, setCategories] = useState<SavingsCategory[]>([
    { name: 'General Expenses', amount: initialDailyAmount, frequency: 'daily' }
  ])

  const calculateDailyTotal = () => {
    return categories.reduce((total, cat) => {
      switch (cat.frequency) {
        case 'daily':
          return total + cat.amount
        case 'weekly':
          return total + (cat.amount / 7)
        case 'monthly':
          return total + (cat.amount / 30)
        default:
          return total
      }
    }, 0)
  }

  const addCategory = () => {
    setCategories([...categories, { name: '', amount: 0, frequency: 'daily' }])
  }

  const removeCategory = (index: number) => {
    const newCategories = categories.filter((_, i) => i !== index)
    setCategories(newCategories)
    onUpdate(calculateDailyTotal())
  }

  const updateCategory = (index: number, field: keyof SavingsCategory, value: string | number) => {
    const newCategories = [...categories]
    newCategories[index] = {
      ...newCategories[index],
      [field]: field === 'amount' ? Number(value) : value
    }
    setCategories(newCategories)
    onUpdate(calculateDailyTotal())
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Customize Savings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                placeholder="Category name"
                value={category.name}
                onChange={(e) => updateCategory(index, 'name', e.target.value)}
                className="flex-1"
              />
              <Input
                type="number"
                value={category.amount}
                onChange={(e) => updateCategory(index, 'amount', e.target.value)}
                className="w-24"
              />
              <Select
                value={category.frequency}
                onValueChange={(value) => updateCategory(index, 'frequency', value)}
              >
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCategory(index)}
                className="h-8 w-8"
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={addCategory}
            className="w-full"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
