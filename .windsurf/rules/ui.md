---
trigger: always_on
---
# UI Coding Standards

## Component Library

### shadcn/ui Components ONLY
- **CRITICAL**: This application uses ONLY shadcn/ui components for all UI elements
- **NO custom components** should be created unless absolutely unavoidable
- Before creating any UI element, check if a shadcn/ui component exists for that purpose
- If a required shadcn/ui component is not installed, install it using:
  ```bash
  npx shadcn@latest add <component-name>
  ```

### Available shadcn/ui Components
Common components include:
- `button` - All button variations
- `input` - Text inputs and form fields
- `card` - Card containers
- `dialog` - Modals and dialogs
- `dropdown-menu` - Dropdown menus
- `select` - Select dropdowns
- `checkbox` - Checkboxes
- `radio-group` - Radio buttons
- `switch` - Toggle switches
- `textarea` - Multi-line text inputs
- `label` - Form labels
- `badge` - Badges and tags
- `alert` - Alert messages
- `toast` - Toast notifications
- `table` - Data tables
- `tabs` - Tab navigation
- `accordion` - Collapsible sections
- `avatar` - User avatars
- `calendar` - Date pickers
- `form` - Form components
- `popover` - Popovers
- `tooltip` - Tooltips
- `sheet` - Side sheets
- `skeleton` - Loading skeletons

### Component Installation
When a component is needed but not available:
1. Check the [shadcn/ui documentation](https://ui.shadcn.com) for the component
2. Install using: `npx shadcn@latest add <component-name>`
3. Import and use the component from `@/components/ui/<component-name>`

## Styling Standards

### Tailwind CSS Only
- Use **Tailwind CSS utility classes** exclusively for styling
- **NO inline styles** (`style={{}}`) should be used
- **NO custom CSS files** for component styling
- All styling must be done through Tailwind classes

### Responsive Design
- Follow **mobile-first** approach
- Use responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Test all UI components on mobile, tablet, and desktop viewports

### Spacing Scale
- Use consistent spacing scale: `4`, `8`, `12`, `16`, `20`, `24`, `32`, `40`, `48`, `64`
- Prefer spacing utilities: `p-4`, `m-8`, `gap-4`, `space-y-4`
- Maintain consistent padding/margin throughout the app

### Color System
- Use Tailwind's color palette or theme colors defined in `tailwind.config`
- Prefer semantic color names: `primary`, `secondary`, `destructive`, `muted`
- Use opacity modifiers when needed: `bg-primary/10`, `text-muted/50`

## Component Usage Standards

### Buttons
- Always use shadcn/ui `Button` component
- Include hover states (automatically handled by shadcn)
- Include disabled states with `disabled` prop
- Use appropriate variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- Example:
  ```tsx
  <Button variant="default" size="default">Click me</Button>
  <Button variant="outline" disabled>Disabled</Button>
  ```

### Forms
- Use shadcn/ui `Form` components with React Hook Form
- Always include proper labels using `Label` component
- Use `Input`, `Textarea`, `Select`, etc. from shadcn/ui
- Include validation feedback and error states
- Example:
  ```tsx
  <Form {...form}>
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </Form>
  ```

### Loading States
- Use shadcn/ui `Skeleton` component for loading states
- Always show loading skeletons for async data
- Match skeleton layout to actual content layout
- Example:
  ```tsx
  {isLoading ? <Skeleton className="h-12 w-full" /> : <Content />}
  ```

### Dialogs and Modals
- Use shadcn/ui `Dialog` component for all modals
- Use `Sheet` component for side panels
- Include proper close buttons and escape key handling (built-in)
- Example:
  ```tsx
  <Dialog>
    <DialogTrigger asChild>
      <Button>Open</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Title</DialogTitle>
      </DialogHeader>
      {/* Content */}
    </DialogContent>
  </Dialog>
  ```

### Data Display
- Use shadcn/ui `Table` for tabular data
- Use `Card` for grouped content
- Use `Badge` for status indicators
- Use `Avatar` for user images

### Notifications
- Use shadcn/ui `Toast` for temporary notifications
- Use `Alert` for persistent messages
- Provide clear, actionable messages

## Accessibility Standards

### ARIA and Semantic HTML
- shadcn/ui components include proper ARIA attributes by default
- Use semantic HTML elements when available
- Ensure keyboard navigation works for all interactive elements
- Test with screen readers when possible

### Focus Management
- Visible focus indicators (handled by shadcn/ui)
- Logical tab order
- Focus trapping in modals (built into Dialog component)

### Color Contrast
- Ensure sufficient color contrast for text (WCAG AA minimum)
- Don't rely on color alone to convey information

## Layout Standards

### Container Widths
- Use consistent max-width containers: `max-w-7xl`, `max-w-4xl`, etc.
- Center containers with `mx-auto`
- Add horizontal padding: `px-4 sm:px-6 lg:px-8`

### Grid and Flex
- Use Tailwind's grid and flex utilities
- Prefer `grid` for complex layouts
- Prefer `flex` for simple alignments
- Use `gap` for spacing between items

### Composition
- Compose complex UIs from shadcn/ui primitives
- Keep components focused and single-purpose
- Extract reusable patterns into component compositions (still using shadcn/ui)

## Icons

### Lucide Icons
- Use Lucide React for all icons (shadcn/ui's recommended icon library)
- Import from `lucide-react`
- Maintain consistent icon sizes: `h-4 w-4`, `h-5 w-5`, `h-6 w-6`
- Example:
  ```tsx
  import { ChevronRight, User, Settings } from "lucide-react"
  <ChevronRight className="h-4 w-4" />
  ```

## Performance

### Code Splitting
- Use dynamic imports for heavy components
- Lazy load routes and modals when appropriate

### Optimization
- Minimize re-renders with proper React patterns
- Use `useMemo` and `useCallback` when beneficial
- Avoid unnecessary state updates

## Forbidden Practices

### ❌ DO NOT
- Create custom UI components from scratch
- Use inline styles or custom CSS files
- Use other UI libraries (Material-UI, Ant Design, etc.)
- Override shadcn/ui component styles excessively
- Create custom buttons, inputs, or form elements
- Use `<div>` with click handlers instead of `<Button>`
- Hardcode colors instead of using theme colors

### ✅ DO
- Always check shadcn/ui documentation first
- Install missing shadcn/ui components as needed
- Use Tailwind utilities for all styling
- Compose complex UIs from shadcn/ui primitives
- Follow shadcn/ui's composition patterns
- Use semantic component variants
- Maintain consistent spacing and colors

## Component Variants and Customization

### Using Variants
- shadcn/ui components support variants via props
- Use `variant` prop for visual variations
- Use `size` prop for size variations
- Example:
  ```tsx
  <Button variant="outline" size="sm">Small Outline</Button>
  <Button variant="destructive" size="lg">Large Destructive</Button>
  ```

### Extending with Tailwind
- Add additional Tailwind classes via `className` prop
- Use `cn()` utility for conditional classes
- Example:
  ```tsx
  import { cn } from "@/lib/utils"
  <Button className={cn("w-full", isActive && "bg-primary")}>
  ```

## Documentation Reference

- **shadcn/ui Docs**: https://ui.shadcn.com
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev

## Summary

This application is built entirely on shadcn/ui components. Before implementing any UI feature, consult the shadcn/ui documentation to find the appropriate component. If it doesn't exist in the project, install it. Never create custom UI components when a shadcn/ui alternative exists.
