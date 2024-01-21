import React from 'react'
import {menu} from "../../menu.js"
import "../../styles/Menu.scss"
import {Link} from "react-router-dom"
import GridViewIcon from '@mui/icons-material/GridView';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ArticleIcon from '@mui/icons-material/Article';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DescriptionIcon from '@mui/icons-material/Description';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

const Menu = () => {
  return (
    <div className="menu">
       
        <div className="item"  >
          <span className="title">General</span>
           
            <Link to={"/sistema/inicio"} className="listItem"  > 
              <GridViewIcon className='menu-icon' />
              <span className="listItemTitle">Inicio</span>
            </Link>
 
            <Link to={"/sistema/usuarios"} className="listItem"  >
            <PeopleAltIcon className='menu-icon'/>
              <span className="listItemTitle">Usuarios</span>
            </Link>
        
        </div>
        <div className="item"  >
          <span className="title">Gestión</span>
           
            <Link to={"/sistema/libros"} className="listItem"  >
            <LibraryBooksIcon className='menu-icon'/>
              <span className="listItemTitle">Libros</span>
            </Link>
            <Link to={"/sistema/proyectos"} className="listItem"  >
            <ArticleIcon className='menu-icon'/>
              <span className="listItemTitle">Proyectos</span>
            </Link>
            <Link to={"/sistema/solicitantes"} className="listItem"  >
            <NoteAltIcon className='menu-icon'/>
              <span className="listItemTitle">Solicitantes </span>

            </Link>
            
            <Link to={"/sistema/prestamos-libros"} className="listItem"  >
            <CheckBoxIcon className='menu-icon'/>
              <span className="listItemTitle">Prestamo de Libros</span>
            </Link>
            <Link to={"/sistema/prestamos-proyectos"} className="listItem"  >
            <CalendarMonthIcon className='menu-icon'/> 
              <span className="listItemTitle">Prestamos de proyecto</span>
            </Link>
            <Link to={"/sistema/reservaciones"} className="listItem"  >
            <CalendarMonthIcon className='menu-icon'/> 
              <span className="listItemTitle">Reservaciones</span>
            </Link>
        </div>
        
    </div>
  )
}

export default Menu