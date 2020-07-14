<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Book_model
 * Модель для работы с книгами
 */
class Book_model extends CI_Model {

	/**
	 * Загрузка списка книг
	 */


	public function loadList()
	{
		// todo реализовать получение списка книг из БД
		//return array(
		//	array('book_id' => 1, 'book_name' => 'Евгений Онегин', 'author_name' => 'Пушкин А.С.', 'book_year' => 1833),
		//	array('book_id' => 2, 'book_name' => 'Война и мир', 'author_name' => 'Толстой Л.Н.', 'book_year' => 1869),
		//	array('book_id' => 3, 'book_name' => 'Анна Каренина', 'author_name' => 'Толстой Л.Н.', 'book_year' => 1877)
		//);
 
		$query = $this->db->get('book');


		return $query->result();
	}

	public function newBook($data) {
		$query = $this->db->insert('book',$data);
		return $query;
	}

	public function editBook($data) {
		$query = $this->db->update('book', $data, 'id='.$data['id']);
		return $query;
	}

	public function deletedBook($data) {
		$query = $this->db->delete('book', $data, array('id' => $data['id']));
		return $query;
	}

	public function exportXml($data) {

		
		$res = $this->db->get('book');

	    if ($res->num_rows() > 0) {
	        $sxe   = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><books/>');
	        header("Content-type: text/xml");
	        foreach($res->result() as $item) {
	            $book = $sxe->addChild('book');
	            $book->addAttribute('id', $item->id);
	            $book->addChild('name', $item->name);
	            $book->addChild('author', $item->author);
	            $book->addChild('year', $item->year);
	        }
	    }

	    $xmlPlain = $sxe->asXML();
		echo $xmlPlain;

	}

}
