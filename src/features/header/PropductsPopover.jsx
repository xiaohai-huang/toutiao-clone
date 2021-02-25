import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { MenuList } from "@material-ui/core";

const products = [
  { name: "问答" },
  { name: "头条百科" },
  { name: "头条号" },
  { name: "图虫" },
  { name: "正版图库" },
  { name: "广告投放" },
  { name: "懂车帝" },
];

export default function SimpleMenu() {
  return (
    <div>
      <MenuList>
        {products.map((product) => (
          <MenuItem key={product.name}>{product.name}</MenuItem>
        ))}
      </MenuList>
    </div>
  );
}
