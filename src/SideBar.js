import React, { useState } from "react";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {MdOutlineDoubleArrow} from "react-icons/md"
import { FaList } from "react-icons/fa";
import { FiMail, FiLogOut } from "react-icons/fi";
import { DiReact } from "react-icons/di";

import { RiPencilLine } from "react-icons/ri";
import { BiCog,BiSquareRounded } from "react-icons/bi";

import "react-pro-sidebar/dist/css/styles.css";
import "./App.css";

const SideBar = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);

  return (
    <>
      <ProSidebar collapsed={!menuCollapse}>
        <SidebarHeader>
          <div>
            <Menu className="react">
              <MenuItem icon={<DiReact />}></MenuItem>
              <MenuItem icon={<MdOutlineDoubleArrow />}></MenuItem>
            </Menu>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem active={true} icon={<FiMail />}>
          
            </MenuItem>
            <MenuItem icon={<FaList />}>Category</MenuItem>
         
            <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
            <MenuItem icon={<BiCog />}>Settings</MenuItem>
            <MenuItem
              icon={<FiLogOut />}
              style={{ borderTop: "1px solid rgba(173, 173, 173, 0.2)" }}
            >
              Logout
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter style={{ borderTop: "none" }}>
          <Menu iconShape="circle">
            <MenuItem icon={<BiSquareRounded />}>Logout</MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
