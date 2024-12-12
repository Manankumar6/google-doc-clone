'use client';

import { useEditorStore } from '@/app/store/use-editor-store';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';
import { type Level } from '@tiptap/extension-heading'
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,

  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  ListCollapseIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  MinusIcon,
  PlusIcon,
  PrinterIcon,
  Redo2Icon,

  RemoveFormattingIcon,
  SearchIcon,
  SpellCheckIcon,
  Underline,
  Undo2Icon,
  UploadIcon,
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';






const LineHeightButton = () => {
  const { editor } = useEditorStore();
  const lineHeights = [
   {label:"Default",value:'normal'},
   {label:"Single",value:'1'},
   {label:"1.15",value:'1.15'},
   {label:"1.5",value:'1.5'},
   {label:"Double",value:'2'},
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80  overflow-hidden text-sm'

        >
          <ListCollapseIcon className='size-4' />
        </button>

      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 gap-y-1 flex flex-col '>
        {lineHeights.map(({ label, value }) => {
          return (
            <button
              key={value}
              onClick={() => editor?.chain().focus().setLineHeight(value).run()}
              className={cn('flex items-center gap-x-2 px-2 py-1.5 rounded-sm hover:bg-neutral-200/80 ', editor?.getAttributes('paragraph').lineHeight === value && "bg-neutral-200/80")}
            >
              
              <span className='text-sm'>{label}</span>
            </button>
          )
        })
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )


}


const FontSizeButton = () => {
  const { editor } = useEditorStore();
  const currentFontSize = editor?.getAttributes('textStyle').fontSize
    ? editor?.getAttributes('textStyle').fontSize.replace("px", "")
    : "16";
  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize)
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run()
      setFontSize(newSize)
      setInputValue(newSize)
      setIsEditing(false)

    }
  }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    }
    const handleInputBlur = () => {
      updateFontSize(inputValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        updateFontSize(inputValue)
        editor?.commands.focus();
      }
    }
    const increment = () => {
      const currentSize = parseInt(fontSize) + 1;
      updateFontSize(currentSize.toString());
    }
    const decrement = () => {
      const currentSize = parseInt(fontSize) - 1;
      if (currentSize > 0) {

        updateFontSize(currentSize.toString());
      }
    }
    return (
      <div className='flex items-center gap-x-0.5'>
        <button
        onClick={decrement}
       className='h-7 w-7 shrink-0 flex  items-center justify-center rounded-sm hover:bg-neutral-200/80 '
        ><MinusIcon className='size-4' /></button>
        {
          isEditing? (
            <Input
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
            className='h-7 w-10  text-sm border border-neutral-400 text-center  rounded-sm bg-transparent focus:outline-none focus:ring-0 '
            />
          ) : (
            <button
               className='h-7 w-10  text-sm border border-neutral-400 text-center  rounded-sm bg-transparent cursor-text '
              onClick={() => {setIsEditing(true); setFontSize(currentFontSize);}}
            >
              {currentFontSize}
            </button>
          )
        }
        <button
        onClick={increment}
       className='h-7 w-7 shrink-0 flex  items-center justify-center rounded-sm hover:bg-neutral-200/80 '
        ><PlusIcon className='size-4' /></button>
        </div>
    )

  }

const Lists = () => {
  const { editor } = useEditorStore();
  const lists = [
    {
      label: "Bullet List",

      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run()
    },
    {
      label: "Ordered List",

      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run()
    },

  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80  overflow-hidden text-sm'

        >
          <ListIcon className='size-4' />
        </button>

      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 gap-y-1 flex flex-col '>
        {lists.map(({ label, onClick, isActive, icon: Icon }) => {
          return (
            <button
              key={label}
              onClick={onClick}
              className={cn('flex items-center gap-x-2 px-2 py-1.5 rounded-sm hover:bg-neutral-200/80 ', isActive() && "bg-neutral-200/80")}
            >
              <Icon className='size-4' />
              <span className='text-sm'>{label}</span>
            </button>
          )
        })
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )


}
const AlignText = () => {
  const { editor } = useEditorStore();
  const alignments = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenterIcon
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRightIcon
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: AlignJustifyIcon
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80  overflow-hidden text-sm'

        >
          <AlignLeftIcon className='size-4' />
        </button>

      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 gap-y-1 flex flex-col '>
        {alignments.map(({ label, value, icon: Icon }) => {
          return (
            <button
              key={value}
              onClick={() => editor?.chain().focus().setTextAlign(value).run()}
              className={cn('flex items-center gap-x-2 px-2 py-1.5 rounded-sm hover:bg-neutral-200/80 ', editor?.isActive({ TextAlign: value }) && "bg-neutral-200/80")}
            >
              <Icon className='size-4' />
              <span className='text-sm'>{label}</span>
            </button>
          )
        })
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )


}



const ImageButton = () => {
  const { editor } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageURL, setImageURL] = useState("")


  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
    setImageURL('')
  }

  const onUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageURL = URL.createObjectURL(file)
        onChange(imageURL)
      }
    }
    input.click()
  }

  const handleImageUrlSubmit = () => {
    if (imageURL) {
      onChange(imageURL)
      setImageURL("")
      setIsDialogOpen(false)
    }
  }

  return (<>

    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <button
          className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'

        >
          <ImageIcon className='size-4' />
        </button>

      </DropdownMenuTrigger>
      <DropdownMenuContent >
        <DropdownMenuItem onClick={onUpload}>
          <UploadIcon className='size-4 mr-2' />
          Upload
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
          <SearchIcon className='size-4 mr-2' />
          Paste img url
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insert Image URL</DialogTitle>
        </DialogHeader>
        <Input
          placeholder='Insert Image URL'
          value={imageURL}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleImageUrlSubmit();
            }
          }}
          onChange={(e) => setImageURL(e.target.value)}
        />
        <DialogFooter>
          <Button onClick={handleImageUrlSubmit}>
            Insert
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>



  </>
  )
}
const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("")
  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange('link').setLink({ href }).run()
    setValue('')
  }
  return (
    <DropdownMenu onOpenChange={(open) => {
      if (open) {
        setValue(editor?.getAttributes('link').href || "")
      }
    }}>
      <DropdownMenuTrigger asChild>
        <button
          className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'

        >
          <Link2Icon className='size-4' />
        </button>

      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2.5 flex items-center gap-x-2'>
        <Input
          placeholder='https://example.com'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => onChange(value)} >Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}




const HighlightButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes('textStyle').color || "#fff";
  const onChange = (color: any) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'

        >
          <HighlighterIcon className='size-4' />
        </button>

      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <SketchPicker
          color={value}
          onChange={onChange}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
const TextColorButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes('textStyle').color || "#000000";
  const onChange = (color: any) => {
    editor?.chain().focus().setColor(color.hex).run();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'

        >
          <span className='text-xs'>A</span>
          <div className='h-0.5 w-full ' style={{ backgroundColor: value }} />
        </button>

      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <SketchPicker
          color={value}
          onChange={onChange}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


const HeadingLevelButton = () => {
  const { editor } = useEditorStore();
  const headings = [
    { label: "Normal text", value: 0, fontSize: '16px' },
    { label: "Heading 1 ", value: 1, fontSize: '32px' },
    { label: "Heading 2 ", value: 2, fontSize: '24px' },
    { label: "Heading 3 ", value: 3, fontSize: '20px' },
    { label: "Heading 4 ", value: 4, fontSize: '18px' },
    { label: "Heading 5 ", value: 5, fontSize: '16px' },
  ]

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
      return "Normal text";
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn('h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm')}>
          <span className='truncate'>
            {getCurrentHeading()}

          </span>
          <ChevronDownIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {headings.map(({ label, value, fontSize }) => (
          <button key={value}
            onClick={() => {
              if (value === 0) {

                editor?.chain().focus().setParagraph().run()
              } else {
                editor?.chain().focus().toggleHeading({ level: value as Level }).run()
              }

            }
            }
            className={cn('flex items-center gap-x-2 rounded-sm hover:bg-neutral-200/80 py-0.5 ',
              (value === 0 && !editor?.isActive('heading')) || editor?.isActive('heading', { level: value }) && 'bg-neutral-200/80'
            )}
            style={{ fontSize }}
          >
            {label}

          </button>
        ))}

      </DropdownMenuContent>
    </DropdownMenu>
  )
}







const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const fonts = [
    { label: "Arial", value: 'Arial' },
    { label: "Times New Roman", value: 'Times New Roman' },
    { label: "Georgia", value: 'Georgia' },
    { label: "Courier New", value: 'Courier New' },
    { label: "Verdana", value: 'Verdana' },
    { label: "Trebuchet MS", value: 'Trebuchet MS' },
    { label: "Impact", value: 'Impact' },
    { label: "Comic Sans MS", value: 'Comic Sans MS' },
    { label: "Tahoma", value: 'Tahoma' },
    { label: "Lucida Sans", value: 'Lucida Sans' },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn('h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm')}>
          <span className='truncate'>
            {editor?.getAttributes('textStyle').FontFamily || 'Arial'}

          </span>
          <ChevronDownIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1' >
        {fonts.map(({ label, value }) => (

          <button key={value}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            className={cn('flex items-center gap-x-2 rounded-sm hover:bg-neutral-200/80 py-0.5 ',
              editor?.getAttributes('textStyle').FontFamily === value && 'bg-neutral-200/80'
            )}
            style={{ fontFamily: value }}
          >
            <span className='text-sm '>{label}</span>

          </button>
        )
        )}

      </DropdownMenuContent>
    </DropdownMenu>
  )
}



interface ToolBarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({ onClick, isActive, icon: Icon }: ToolBarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80'
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

const Toolbar = () => {
  const { editor } = useEditorStore();





  const section = [
    [
      {
        label: 'Undo',
        icon: Undo2Icon,
        onClick: () => editor?.chain().undo().run(),
      },
      {
        label: 'Redo',
        icon: Redo2Icon,
        onClick: () => editor?.chain().redo().run(),
      },
      {
        label: 'Print',
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: 'Spell Check',
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute('spellcheck') === 'true';
          editor?.view.dom.setAttribute('spellcheck', !current ? 'true' : 'false');
        },
      },
    ],
    [
      {
        label: 'Bold',
        icon: BoldIcon,
        isActive: editor?.isActive('bold'),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: 'Italic',
        icon: ItalicIcon,
        isActive: editor?.isActive('italic'),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: 'UnderLine',
        icon: Underline,
        isActive: editor?.isActive('underline'),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        isActive: false,
        onClick: () => console.log("Todo Comment")
      },
      {
        label: "List todo",
        icon: ListTodoIcon,
        isActive: editor?.isActive('tasklist'),
        onClick: () => editor?.chain().focus().toggleTaskList().run()
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,

        onClick: () => editor?.chain().focus().unsetAllMarks().run()
      },
    ]
  ];

  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {section[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <FontFamilyButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <HeadingLevelButton />

      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
     <FontSizeButton/>
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />

      {section[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <TextColorButton />

      <HighlightButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />

      <LinkButton />

      <ImageButton />

      <AlignText />
     <LineHeightButton/>

      <Lists />
      {section[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

    </div>
  );
};

export default Toolbar;
