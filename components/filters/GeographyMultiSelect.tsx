'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { useDashboardStore } from '@/lib/store'
import { Check, ChevronDown, ChevronRight } from 'lucide-react'

interface GeoNode {
  name: string
  children: GeoNode[]
  depth: number
}

export function GeographyMultiSelect() {
  const { data, filters, updateFilters } = useDashboardStore()
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Build hierarchy tree from countries map
  const { tree, flatList } = useMemo(() => {
    if (!data || !data.dimensions?.geographies) return { tree: [], flatList: [] }

    const allGeos = data.dimensions.geographies.all_geographies || []
    const countriesMap = data.dimensions.geographies.countries || {}

    // Find root geos (not children of any other geo)
    const childSet = new Set<string>()
    Object.values(countriesMap).forEach((children: string[]) => {
      children.forEach(c => childSet.add(c))
    })
    const naturalRoots = allGeos.filter(g => !childSet.has(g))

    // Promote direct children of top-level geo to be roots too
    // e.g. "ASEAN and MEA" -> also show "ASEAN" and "MEA" at top level
    const roots: string[] = []
    for (const root of naturalRoots) {
      roots.push(root)
      const directChildren = (countriesMap[root] || []).filter((c: string) => allGeos.includes(c))
      for (const child of directChildren) {
        if (!roots.includes(child)) roots.push(child)
      }
    }

    // Build tree recursively, but skip children already promoted to root
    function buildNode(name: string, depth: number, skipChildren?: Set<string>): GeoNode {
      const children = (countriesMap[name] || [])
        .filter((c: string) => allGeos.includes(c) && !(skipChildren && skipChildren.has(c)))
        .map((c: string) => buildNode(c, depth + 1))
      return { name, children, depth }
    }

    // For the top-level combined geo, don't show its children (they're now separate roots)
    const promotedChildren = new Set<string>()
    for (const root of naturalRoots) {
      const directChildren = (countriesMap[root] || []).filter((c: string) => allGeos.includes(c))
      directChildren.forEach(c => promotedChildren.add(c))
    }

    const tree = roots.map(r => {
      if (naturalRoots.includes(r)) {
        return buildNode(r, 0, promotedChildren)
      }
      return buildNode(r, 0)
    })

    // Flatten tree for search
    function flatten(nodes: GeoNode[]): GeoNode[] {
      const result: GeoNode[] = []
      for (const node of nodes) {
        result.push(node)
        result.push(...flatten(node.children))
      }
      return result
    }

    return { tree, flatList: flatten(tree) }
  }, [data])

  // Auto-expand roots on first open
  useEffect(() => {
    if (isOpen && expanded.size === 0 && tree.length > 0) {
      const initial = new Set<string>()
      tree.forEach(root => {
        if (root.children.length > 0) initial.add(root.name)
      })
      setExpanded(initial)
    }
  }, [isOpen, tree, expanded.size])

  const toggleExpand = (name: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const handleToggle = (geography: string) => {
    const current = filters.geographies
    const updated = current.includes(geography)
      ? current.filter(g => g !== geography)
      : [...current, geography]
    updateFilters({ geographies: updated })
  }

  const handleSelectAll = () => {
    if (!data) return
    updateFilters({
      geographies: data.dimensions.geographies.all_geographies
    })
  }

  const handleClearAll = () => {
    updateFilters({ geographies: [] })
  }

  if (!data) return null

  const selectedCount = filters.geographies.length
  const search = searchTerm.toLowerCase()

  // Filter nodes by search
  const filteredNodes = searchTerm
    ? flatList.filter(n => n.name.toLowerCase().includes(search))
    : null

  function renderNode(node: GeoNode) {
    const hasChildren = node.children.length > 0
    const isExpanded = expanded.has(node.name)
    const isSelected = filters.geographies.includes(node.name)
    const indent = node.depth * 20

    return (
      <div key={node.name}>
        <label
          className={`flex items-center px-3 py-2 hover:bg-blue-50 cursor-pointer border-t border-gray-100`}
          style={{ paddingLeft: `${12 + indent}px` }}
        >
          {hasChildren ? (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleExpand(node.name) }}
              className="mr-1 p-0.5 hover:bg-gray-200 rounded"
            >
              <ChevronRight className={`h-3 w-3 text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </button>
          ) : (
            <span className="w-5" />
          )}
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => handleToggle(node.name)}
            className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <span className={`text-sm text-black flex-1 ${hasChildren ? 'font-medium' : ''}`}>
            {node.name}
          </span>
          {isSelected && (
            <Check className="h-4 w-4 text-blue-600" />
          )}
        </label>
        {hasChildren && isExpanded && node.children.map(child => renderNode(child))}
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>

      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
      >
        <span className="text-sm text-black">
          {selectedCount === 0
            ? 'Select geographies...'
            : `${selectedCount} selected`}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-96 overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b">
            <input
              type="text"
              placeholder="Search geographies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="px-3 py-2 bg-gray-50 border-b flex gap-2">
            <button
              onClick={handleSelectAll}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              Select All
            </button>
            <button
              onClick={handleClearAll}
              className="px-3 py-1 text-xs bg-gray-100 text-black rounded hover:bg-gray-200"
            >
              Clear All
            </button>
          </div>

          {/* Geography List - Hierarchical */}
          <div className="overflow-y-auto max-h-64">
            {filteredNodes ? (
              // Search mode: flat list
              filteredNodes.length === 0 ? (
                <div className="px-3 py-4 text-sm text-black text-center">
                  No geographies found matching your search
                </div>
              ) : (
                filteredNodes.map(node => (
                  <label
                    key={node.name}
                    className="flex items-center px-3 py-2 hover:bg-blue-50 cursor-pointer border-t border-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={filters.geographies.includes(node.name)}
                      onChange={() => handleToggle(node.name)}
                      className="mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-black flex-1">{node.name}</span>
                    {filters.geographies.includes(node.name) && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </label>
                ))
              )
            ) : (
              // Normal mode: hierarchical tree
              tree.length === 0 ? (
                <div className="px-3 py-4 text-sm text-black text-center">
                  No geographies available
                </div>
              ) : (
                tree.map(node => renderNode(node))
              )
            )}
          </div>
        </div>
      )}

      {/* Selected Count Badge */}
      {selectedCount > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="text-xs text-black">
            {selectedCount} {selectedCount === 1 ? 'geography' : 'geographies'} selected
          </span>
        </div>
      )}
    </div>
  )
}
