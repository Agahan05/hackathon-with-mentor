import React, { useContext, useEffect } from "react";
import { AdminContext } from "../contexts/AdminProvider";
import { Delete, ModeEdit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

function AdminPage() {
  const { watches, getWatches, deleteWatch } = useContext(AdminContext);

  useEffect(() => {
    getWatches();
  }, []);

  return (
    <div className="admin-page">
      <Container>
        <h2>Админ панель</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Бренд</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Год</TableCell>
              <TableCell>Страна</TableCell>
              <TableCell>Фото</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {watches.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.price}$</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>{item.country}</TableCell>
                <TableCell>
                  <img width={100} src={item.photo} alt="" />
                </TableCell>
                <TableCell>
                  <Delete onClick={() => deleteWatch(item.id)} />
                </TableCell>
                <TableCell>
                  <Link to={`/admin/edit/${item.id}`}>
                    <ModeEdit />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </div>
  );
}

export default AdminPage;
