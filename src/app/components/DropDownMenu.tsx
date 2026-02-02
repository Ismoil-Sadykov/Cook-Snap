'use client'

import { logout } from '@/src/utils/unauth';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CircleUserRound, EllipsisVertical, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter()

  const route = () => {
    router.push("/profile")
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <EllipsisVertical />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={() => {
          handleClose()
          route()
        }}>
          <button>
            <div className='cursor-pointer flex items-center gap-3'>
              <CircleUserRound />
              <p>Profile</p>
            </div>
          </button>
        </MenuItem>
        <MenuItem onClick={() => {
          handleClose()
          logout()
        }}>
          <div className='flex items-center gap-3'>
            <LogOut color="red" />
            <p>Logout</p>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
