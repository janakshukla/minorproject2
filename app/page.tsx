"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Plus, Minus, RotateCcw, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import type { JSX } from "react"

// Array Visualizer Component
const ArrayVisualizer = () => {
  const [array, setArray] = useState<number[]>([1, 2, 3, 4, 5])
  const [inputValue, setInputValue] = useState("")
  const [inputIndex, setInputIndex] = useState("")
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null)
  const [speed, setSpeed] = useState(1)

  const addItem = () => {
    if (inputValue.trim() !== "") {
      const newValue = Number.parseInt(inputValue)
      if (!isNaN(newValue)) {
        setArray([...array, newValue])
        setInputValue("")
        animateIndex(array.length)
      }
    }
  }

  const insertItem = () => {
    if (inputValue.trim() !== "" && inputIndex.trim() !== "") {
      const newValue = Number.parseInt(inputValue)
      const index = Number.parseInt(inputIndex)
      if (!isNaN(newValue) && !isNaN(index) && index >= 0 && index <= array.length) {
        const newArray = [...array]
        newArray.splice(index, 0, newValue)
        setArray(newArray)
        setInputValue("")
        setInputIndex("")
        animateIndex(index)
      }
    }
  }

  const removeItem = () => {
    if (inputIndex.trim() !== "") {
      const index = Number.parseInt(inputIndex)
      if (!isNaN(index) && index >= 0 && index < array.length) {
        animateIndex(index)
        setTimeout(() => {
          const newArray = [...array]
          newArray.splice(index, 1)
          setArray(newArray)
          setInputIndex("")
        }, 500 / speed)
      }
    }
  }

  const resetArray = () => {
    setArray([1, 2, 3, 4, 5])
  }

  const animateIndex = (index: number) => {
    setAnimatingIndex(index)
    setTimeout(() => {
      setAnimatingIndex(null)
    }, 500 / speed)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="value">Value</Label>
          <Input
            id="value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a number"
            type="number"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="index">Index</Label>
          <Input
            id="index"
            value={inputIndex}
            onChange={(e) => setInputIndex(e.target.value)}
            placeholder="Enter an index"
            type="number"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="speed">Animation Speed</Label>
          <Slider
            id="speed"
            defaultValue={[1]}
            max={2}
            min={0.2}
            step={0.1}
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
            className="py-4"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={addItem} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add
        </Button>
        <Button onClick={insertItem} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Insert
        </Button>
        <Button onClick={removeItem} variant="destructive" className="flex items-center gap-1">
          <Minus className="h-4 w-4" /> Remove
        </Button>
        <Button onClick={resetArray} variant="outline" className="flex items-center gap-1">
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
      </div>

      <div className="flex justify-center py-8">
        <div className="flex items-end gap-1">
          {array.map((value, index) => (
            <motion.div
              key={`${index}-${value}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: animatingIndex === index ? 1.1 : 1,
                backgroundColor: animatingIndex === index ? "hsl(var(--primary))" : "hsl(var(--card))",
                color: animatingIndex === index ? "hsl(var(--primary-foreground))" : "hsl(var(--card-foreground))",
              }}
              transition={{ duration: 0.3 }}
              className="relative flex flex-col items-center"
            >
              <div
                className="border border-border rounded-md flex items-center justify-center"
                style={{
                  width: "50px",
                  height: "50px",
                }}
              >
                {value}
              </div>
              <div className="text-xs mt-1">{index}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-muted p-4 rounded-md">
        <h3 className="font-medium mb-2">Array Operations:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>
            <strong>Add:</strong> Appends a value to the end of the array
          </li>
          <li>
            <strong>Insert:</strong> Inserts a value at the specified index
          </li>
          <li>
            <strong>Remove:</strong> Removes the value at the specified index
          </li>
          <li>
            <strong>Time Complexity:</strong> Access O(1), Search O(n), Insert O(n), Delete O(n)
          </li>
        </ul>
      </div>
    </div>
  )
}

// Stack Visualizer Component
const StackVisualizer = () => {
  const [stack, setStack] = useState<number[]>([5, 4, 3, 2, 1])
  const [inputValue, setInputValue] = useState("")
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null)
  const [speed, setSpeed] = useState(1)

  const push = () => {
    if (inputValue.trim() !== "") {
      const newValue = Number.parseInt(inputValue)
      if (!isNaN(newValue)) {
        setStack([newValue, ...stack])
        setInputValue("")
        animateIndex(0)
      }
    }
  }

  const pop = () => {
    if (stack.length > 0) {
      animateIndex(0)
      setTimeout(() => {
        setStack(stack.slice(1))
      }, 500 / speed)
    }
  }

  const resetStack = () => {
    setStack([5, 4, 3, 2, 1])
  }

  const animateIndex = (index: number) => {
    setAnimatingIndex(index)
    setTimeout(() => {
      setAnimatingIndex(null)
    }, 500 / speed)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="stack-value">Value</Label>
          <Input
            id="stack-value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a number"
            type="number"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="stack-speed">Animation Speed</Label>
          <Slider
            id="stack-speed"
            defaultValue={[1]}
            max={2}
            min={0.2}
            step={0.1}
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
            className="py-4"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={push} className="flex items-center gap-1">
          <ChevronUp className="h-4 w-4" /> Push
        </Button>
        <Button onClick={pop} variant="secondary" className="flex items-center gap-1">
          <ChevronDown className="h-4 w-4" /> Pop
        </Button>
        <Button onClick={resetStack} variant="outline" className="flex items-center gap-1">
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
      </div>

      <div className="flex justify-center py-8">
        <div className="flex flex-col-reverse items-center gap-1">
          {stack.map((value, index) => (
            <motion.div
              key={`${index}-${value}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: animatingIndex === index ? 1.1 : 1,
                backgroundColor: animatingIndex === index ? "hsl(var(--primary))" : "hsl(var(--card))",
                color: animatingIndex === index ? "hsl(var(--primary-foreground))" : "hsl(var(--card-foreground))",
              }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div
                className="border border-border rounded-md flex items-center justify-center"
                style={{
                  width: "200px",
                  height: "40px",
                }}
              >
                {value}
              </div>
              {index === 0 && (
                <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 text-xs font-medium">← Top</div>
              )}
              {index === stack.length - 1 && (
                <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 text-xs font-medium">
                  ← Bottom
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-muted p-4 rounded-md">
        <h3 className="font-medium mb-2">Stack Operations:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>
            <strong>Push:</strong> Adds an element to the top of the stack
          </li>
          <li>
            <strong>Pop:</strong> Removes the top element from the stack
          </li>
          <li>
            <strong>LIFO:</strong> Last In, First Out principle
          </li>
          <li>
            <strong>Time Complexity:</strong> Push O(1), Pop O(1), Peek O(1)
          </li>
        </ul>
      </div>
    </div>
  )
}

// Queue Visualizer Component
const QueueVisualizer = () => {
  const [queue, setQueue] = useState<number[]>([1, 2, 3, 4, 5])
  const [inputValue, setInputValue] = useState("")
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null)
  const [speed, setSpeed] = useState(1)

  const enqueue = () => {
    if (inputValue.trim() !== "") {
      const newValue = Number.parseInt(inputValue)
      if (!isNaN(newValue)) {
        setQueue([...queue, newValue])
        setInputValue("")
        animateIndex(queue.length)
      }
    }
  }

  const dequeue = () => {
    if (queue.length > 0) {
      animateIndex(0)
      setTimeout(() => {
        setQueue(queue.slice(1))
      }, 500 / speed)
    }
  }

  const resetQueue = () => {
    setQueue([1, 2, 3, 4, 5])
  }

  const animateIndex = (index: number) => {
    setAnimatingIndex(index)
    setTimeout(() => {
      setAnimatingIndex(null)
    }, 500 / speed)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="queue-value">Value</Label>
          <Input
            id="queue-value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a number"
            type="number"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="queue-speed">Animation Speed</Label>
          <Slider
            id="queue-speed"
            defaultValue={[1]}
            max={2}
            min={0.2}
            step={0.1}
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
            className="py-4"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={enqueue} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Enqueue
        </Button>
        <Button onClick={dequeue} variant="secondary" className="flex items-center gap-1">
          <Minus className="h-4 w-4" /> Dequeue
        </Button>
        <Button onClick={resetQueue} variant="outline" className="flex items-center gap-1">
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
      </div>

      <div className="flex justify-center py-8">
        <div className="flex items-center gap-1">
          {queue.map((value, index) => (
            <motion.div
              key={`${index}-${value}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: animatingIndex === index ? 1.1 : 1,
                backgroundColor: animatingIndex === index ? "hsl(var(--primary))" : "hsl(var(--card))",
                color: animatingIndex === index ? "hsl(var(--primary-foreground))" : "hsl(var(--card-foreground))",
              }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div
                className="border border-border rounded-md flex items-center justify-center"
                style={{
                  width: "50px",
                  height: "50px",
                }}
              >
                {value}
              </div>
              {index === 0 && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">Front</div>
              )}
              {index === queue.length - 1 && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">Rear</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-muted p-4 rounded-md">
        <h3 className="font-medium mb-2">Queue Operations:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>
            <strong>Enqueue:</strong> Adds an element to the end of the queue
          </li>
          <li>
            <strong>Dequeue:</strong> Removes the element from the front of the queue
          </li>
          <li>
            <strong>FIFO:</strong> First In, First Out principle
          </li>
          <li>
            <strong>Time Complexity:</strong> Enqueue O(1), Dequeue O(1)
          </li>
        </ul>
      </div>
    </div>
  )
}

// Linked List Visualizer Component
const LinkedListVisualizer = () => {
  const [list, setList] = useState<number[]>([1, 2, 3, 4, 5])
  const [inputValue, setInputValue] = useState("")
  const [inputIndex, setInputIndex] = useState("")
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null)
  const [speed, setSpeed] = useState(1)

  const addToHead = () => {
    if (inputValue.trim() !== "") {
      const newValue = Number.parseInt(inputValue)
      if (!isNaN(newValue)) {
        setList([newValue, ...list])
        setInputValue("")
        animateIndex(0)
      }
    }
  }

  const addToTail = () => {
    if (inputValue.trim() !== "") {
      const newValue = Number.parseInt(inputValue)
      if (!isNaN(newValue)) {
        setList([...list, newValue])
        setInputValue("")
        animateIndex(list.length)
      }
    }
  }

  const insertAt = () => {
    if (inputValue.trim() !== "" && inputIndex.trim() !== "") {
      const newValue = Number.parseInt(inputValue)
      const index = Number.parseInt(inputIndex)
      if (!isNaN(newValue) && !isNaN(index) && index >= 0 && index <= list.length) {
        const newList = [...list]
        newList.splice(index, 0, newValue)
        setList(newList)
        setInputValue("")
        setInputIndex("")
        animateIndex(index)
      }
    }
  }

  const removeAt = () => {
    if (inputIndex.trim() !== "") {
      const index = Number.parseInt(inputIndex)
      if (!isNaN(index) && index >= 0 && index < list.length) {
        animateIndex(index)
        setTimeout(() => {
          const newList = [...list]
          newList.splice(index, 1)
          setList(newList)
          setInputIndex("")
        }, 500 / speed)
      }
    }
  }

  const resetList = () => {
    setList([1, 2, 3, 4, 5])
  }

  const animateIndex = (index: number) => {
    setAnimatingIndex(index)
    setTimeout(() => {
      setAnimatingIndex(null)
    }, 500 / speed)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="list-value">Value</Label>
          <Input
            id="list-value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a number"
            type="number"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="list-index">Index</Label>
          <Input
            id="list-index"
            value={inputIndex}
            onChange={(e) => setInputIndex(e.target.value)}
            placeholder="Enter an index"
            type="number"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="list-speed">Animation Speed</Label>
          <Slider
            id="list-speed"
            defaultValue={[1]}
            max={2}
            min={0.2}
            step={0.1}
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
            className="py-4"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={addToHead} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add to Head
        </Button>
        <Button onClick={addToTail} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add to Tail
        </Button>
        <Button onClick={insertAt} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Insert At
        </Button>
        <Button onClick={removeAt} variant="destructive" className="flex items-center gap-1">
          <Minus className="h-4 w-4" /> Remove At
        </Button>
        <Button onClick={resetList} variant="outline" className="flex items-center gap-1">
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
      </div>

      <div className="flex justify-center py-8 overflow-x-auto">
        <div className="flex items-center">
          {list.map((value, index) => (
            <motion.div
              key={`${index}-${value}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: animatingIndex === index ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center"
            >
              <motion.div
                animate={{
                  backgroundColor: animatingIndex === index ? "hsl(var(--primary))" : "hsl(var(--card))",
                  color: animatingIndex === index ? "hsl(var(--primary-foreground))" : "hsl(var(--card-foreground))",
                }}
                className="border border-border rounded-full flex items-center justify-center"
                style={{
                  width: "50px",
                  height: "50px",
                }}
              >
                {value}
              </motion.div>
              {index < list.length - 1 && (
                <div className="w-8 h-0.5 bg-border mx-1 flex items-center justify-center">
                  <div className="w-2 h-2 border-t border-r border-border transform rotate-45 translate-x-1"></div>
                </div>
              )}
            </motion.div>
          ))}
          <div className="ml-2 text-xs font-medium">null</div>
        </div>
      </div>

      <div className="bg-muted p-4 rounded-md">
        <h3 className="font-medium mb-2">Linked List Operations:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>
            <strong>Add to Head:</strong> Adds a new node at the beginning of the list
          </li>
          <li>
            <strong>Add to Tail:</strong> Adds a new node at the end of the list
          </li>
          <li>
            <strong>Insert At:</strong> Inserts a new node at the specified position
          </li>
          <li>
            <strong>Remove At:</strong> Removes the node at the specified position
          </li>
          <li>
            <strong>Time Complexity:</strong> Access O(n), Search O(n), Insert O(1) at head/tail, Delete O(1) at head
          </li>
        </ul>
      </div>
    </div>
  )
}

// Binary Search Tree Visualizer Component
const BinaryTreeVisualizer = () => {
  interface TreeNode {
    value: number
    left: TreeNode | null
    right: TreeNode | null
    x: number
    y: number
    highlight?: boolean
  }

  const createTree = (values: number[]): TreeNode | null => {
    if (!values.length) return null

    // Create a balanced BST
    values.sort((a, b) => a - b)

    const buildBalancedBST = (start: number, end: number): TreeNode | null => {
      if (start > end) return null

      const mid = Math.floor((start + end) / 2)
      const node: TreeNode = {
        value: values[mid],
        left: null,
        right: null,
        x: 0,
        y: 0,
      }

      node.left = buildBalancedBST(start, mid - 1)
      node.right = buildBalancedBST(mid + 1, end)

      return node
    }

    return buildBalancedBST(0, values.length - 1)
  }

  const [treeValues, setTreeValues] = useState<number[]>([50, 30, 70, 20, 40, 60, 80])
  const [inputValue, setInputValue] = useState("")
  const [tree, setTree] = useState<TreeNode | null>(createTree(treeValues))
  const [animatingValue, setAnimatingValue] = useState<number | null>(null)
  const [speed, setSpeed] = useState(1)
  const [searchPath, setSearchPath] = useState<number[]>([])
  const [searchResult, setSearchResult] = useState<string | null>(null)

  const addValue = () => {
    if (inputValue.trim() !== "") {
      const newValue = Number.parseInt(inputValue)
      if (!isNaN(newValue) && !treeValues.includes(newValue)) {
        const newValues = [...treeValues, newValue]
        setTreeValues(newValues)
        setTree(createTree(newValues))
        setInputValue("")
        animateValue(newValue)
      }
    }
  }

  const removeValue = () => {
    if (inputValue.trim() !== "") {
      const valueToRemove = Number.parseInt(inputValue)
      if (!isNaN(valueToRemove) && treeValues.includes(valueToRemove)) {
        animateValue(valueToRemove)
        setTimeout(() => {
          const newValues = treeValues.filter((v) => v !== valueToRemove)
          setTreeValues(newValues)
          setTree(createTree(newValues))
          setInputValue("")
        }, 500 / speed)
      }
    }
  }

  const searchValue = () => {
    if (inputValue.trim() !== "") {
      const valueToSearch = Number.parseInt(inputValue)
      if (!isNaN(valueToSearch)) {
        const path: number[] = []
        let found = false

        const search = (node: TreeNode | null, value: number): boolean => {
          if (!node) return false

          path.push(node.value)

          if (node.value === value) {
            found = true
            return true
          }

          if (value < node.value) {
            return search(node.left, value)
          } else {
            return search(node.right, value)
          }
        }

        if (tree) {
          search(tree, valueToSearch)
        }

        setSearchPath(path)
        setSearchResult(found ? "Found!" : "Not found")

        // Animate the search path
        let i = 0
        const animatePath = () => {
          if (i < path.length) {
            animateValue(path[i])
            i++
            setTimeout(animatePath, 500 / speed)
          } else {
            setTimeout(() => {
              setSearchPath([])
              setSearchResult(null)
            }, 1000 / speed)
          }
        }

        animatePath()
      }
    }
  }

  const resetTree = () => {
    const defaultValues = [50, 30, 70, 20, 40, 60, 80]
    setTreeValues(defaultValues)
    setTree(createTree(defaultValues))
    setSearchPath([])
    setSearchResult(null)
  }

  const animateValue = (value: number) => {
    setAnimatingValue(value)
    setTimeout(() => {
      setAnimatingValue(null)
    }, 500 / speed)
  }

  // Calculate positions for tree visualization
  const calculatePositions = (
    node: TreeNode | null,
    depth = 0,
    horizontalIndex = 0,
    totalNodes = 1,
  ): TreeNode | null => {
    if (!node) return null

    const spacing = 60
    const verticalSpacing = 80

    const newNode = { ...node }
    newNode.x = horizontalIndex * spacing
    newNode.y = depth * verticalSpacing

    const nextLevelNodes = Math.pow(2, depth + 1)

    newNode.left = calculatePositions(node.left, depth + 1, horizontalIndex * 2, nextLevelNodes)

    newNode.right = calculatePositions(node.right, depth + 1, horizontalIndex * 2 + 1, nextLevelNodes)

    return newNode
  }

  const positionedTree = tree ? calculatePositions(tree) : null

  // Render tree nodes and edges
  const renderTree = (node: TreeNode | null, centerX = 0, width = 600): JSX.Element | null => {
    if (!node) return null

    const nodeSize = 30
    const levelHeight = 80

    // Calculate x position based on the node's position in the tree
    const x = centerX + (node.x - width / 2)
    const y = node.y + 50

    const isHighlighted = animatingValue === node.value || searchPath.includes(node.value)

    return (
      <>
        {node.left && (
          <>
            <line
              x1={x + nodeSize / 2}
              y1={y + nodeSize / 2}
              x2={centerX + (node.left.x - width / 2) + nodeSize / 2}
              y2={node.left.y + 50 + nodeSize / 2}
              stroke="hsl(var(--border))"
              strokeWidth="2"
            />
            {renderTree(node.left, centerX, width)}
          </>
        )}

        {node.right && (
          <>
            <line
              x1={x + nodeSize / 2}
              y1={y + nodeSize / 2}
              x2={centerX + (node.right.x - width / 2) + nodeSize / 2}
              y2={node.right.y + 50 + nodeSize / 2}
              stroke="hsl(var(--border))"
              strokeWidth="2"
            />
            {renderTree(node.right, centerX, width)}
          </>
        )}

        <motion.circle
          cx={x + nodeSize / 2}
          cy={y + nodeSize / 2}
          r={nodeSize / 2}
          fill={isHighlighted ? "hsl(var(--primary))" : "hsl(var(--card))"}
          stroke="hsl(var(--border))"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            fill: isHighlighted ? "hsl(var(--primary))" : "hsl(var(--card))",
          }}
          transition={{ duration: 0.3 }}
        />

        <text
          x={x + nodeSize / 2}
          y={y + nodeSize / 2 + 5}
          textAnchor="middle"
          fill={isHighlighted ? "hsl(var(--primary-foreground))" : "hsl(var(--card-foreground))"}
          fontSize="14"
        >
          {node.value}
        </text>
      </>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="tree-value">Value</Label>
          <Input
            id="tree-value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a number"
            type="number"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="tree-speed">Animation Speed</Label>
          <Slider
            id="tree-speed"
            defaultValue={[1]}
            max={2}
            min={0.2}
            step={0.1}
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
            className="py-4"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={addValue} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Insert
        </Button>
        <Button onClick={removeValue} variant="destructive" className="flex items-center gap-1">
          <Minus className="h-4 w-4" /> Remove
        </Button>
        <Button onClick={searchValue} variant="secondary" className="flex items-center gap-1">
          <Play className="h-4 w-4" /> Search
        </Button>
        <Button onClick={resetTree} variant="outline" className="flex items-center gap-1">
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
      </div>

      {searchResult && (
        <div
          className={`p-2 text-center rounded-md ${searchResult === "Found!" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {searchResult}
        </div>
      )}

      <div className="flex justify-center py-8 overflow-x-auto">
        <svg width="800" height="400" viewBox="0 0 800 400">
          <g transform="translate(400, 0)">{positionedTree && renderTree(positionedTree)}</g>
        </svg>
      </div>

      <div className="bg-muted p-4 rounded-md">
        <h3 className="font-medium mb-2">Binary Search Tree Operations:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>
            <strong>Insert:</strong> Adds a new node while maintaining the BST property
          </li>
          <li>
            <strong>Remove:</strong> Removes a node while maintaining the BST property
          </li>
          <li>
            <strong>Search:</strong> Finds a value in the tree
          </li>
          <li>
            <strong>BST Property:</strong> For any node, all values in the left subtree are less than the node's value,
            and all values in the right subtree are greater
          </li>
          <li>
            <strong>Time Complexity:</strong> Search, Insert, Delete: O(log n) for balanced trees, O(n) worst case
          </li>
        </ul>
      </div>
    </div>
  )
}

export default function DataStructureVisualizer() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Dristicon-The Data Structure Visualizer</h1>
      <p className="text-center mb-8 text-muted-foreground">
        Visualize and interact with common data structures to understand how they work
      </p>

      <Tabs defaultValue="array" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger value="array">Array</TabsTrigger>
          <TabsTrigger value="stack">Stack</TabsTrigger>
          <TabsTrigger value="queue">Queue</TabsTrigger>
          <TabsTrigger value="linked-list">Linked List</TabsTrigger>
          <TabsTrigger value="binary-tree">Binary Tree</TabsTrigger>
        </TabsList>
        <Card>
          <CardHeader>
            <TabsContent value="array">
              <CardTitle>Array</CardTitle>
              <CardDescription>A collection of elements stored at contiguous memory locations</CardDescription>
            </TabsContent>
            <TabsContent value="stack">
              <CardTitle>Stack</CardTitle>
              <CardDescription>
                A linear data structure that follows the Last In First Out (LIFO) principle
              </CardDescription>
            </TabsContent>
            <TabsContent value="queue">
              <CardTitle>Queue</CardTitle>
              <CardDescription>
                A linear data structure that follows the First In First Out (FIFO) principle
              </CardDescription>
            </TabsContent>
            <TabsContent value="linked-list">
              <CardTitle>Linked List</CardTitle>
              <CardDescription>
                A linear data structure where elements are not stored at contiguous locations
              </CardDescription>
            </TabsContent>
            <TabsContent value="binary-tree">
              <CardTitle>Binary Search Tree</CardTitle>
              <CardDescription>A tree data structure where each node has at most two children</CardDescription>
            </TabsContent>
          </CardHeader>
          <CardContent>
            <TabsContent value="array" className="mt-0">
              <ArrayVisualizer />
            </TabsContent>
            <TabsContent value="stack" className="mt-0">
              <StackVisualizer />
            </TabsContent>
            <TabsContent value="queue" className="mt-0">
              <QueueVisualizer />
            </TabsContent>
            <TabsContent value="linked-list" className="mt-0">
              <LinkedListVisualizer />
            </TabsContent>
            <TabsContent value="binary-tree" className="mt-0">
              <BinaryTreeVisualizer />
            </TabsContent>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <div className="text-sm text-muted-foreground">
              Interactive visualization helps understand data structure operations
            </div>
          </CardFooter>
        </Card>
      </Tabs>
    </div>
  )
}
