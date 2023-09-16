import React, { useEffect, useState } from "react";
import { MenuList } from "../data/data";
import Layout from "../Layout/Layout";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button, // Import Button from @mui/material
} from "@mui/material";

const Gujrati = () => {
  const handleOrderClick = (itemName) => {
    // Implement your order handling logic here
    alert(`Ordered: ${itemName}`);
  };

      const [MenuList , setMenuData] = useState([]);

      useEffect(() => {
        fetch('http://localhost:4000/getMenu', {
        method: 'POST',
        body: JSON.stringify({
            "branch_name": "vadodara"
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
            })
            .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
            })
            .then(data => {  
              var temp_cat = [];
              var temp_menuData = [];
              Object.keys(data).forEach(key => {
                temp_cat.push(key);
                var temp_items = [];
                Object.keys(data[key]).forEach(keys => {
                  temp_items.push(keys);
                  temp_menuData.push(data[key][keys]);
                });
              });   
              setMenuData(temp_menuData);
            })
            .catch(error => {
            console.error('Fetch error:', error);
            });
      });


  return (
    <Layout>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {MenuList.map((menuItem) => (
          <Card key={menuItem.name} sx={{ maxWidth: "300px",display: "flex", m: 2 }}>
            <CardActionArea>
              <CardMedia
                sx={{ minHeight: "400px", maxHeight:"400px", maxWidth:"250px" }}
                component={"img"}
                image={menuItem.image_link}
                alt={menuItem.name}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom component={"div"}>
                  {menuItem.name}
                </Typography>
                <Typography variant="body2">{menuItem.description}</Typography>
                <Button onClick={() => handleOrderClick(menuItem.name)} variant="contained" color="primary">
                  Order Now
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Layout>
  );
};

export default Gujrati;
