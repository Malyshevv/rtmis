<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Book
 * Контроллер для работы с книгами
 */
class Book extends CI_Controller {

	/**
	 * Загрузка списка книг
	 */
	public function loadList()
	{
		$this->load->model('Book_model');
		$bookList = $this->Book_model->loadList();
		echo json_encode($bookList);
	}

	/**
	 * Добавления книг
	 */

	public function NewBook()
	{
		$data = [
			'author' => (string)$this->input->post('author'),
			'name' => (string)$this->input->post('book'),
			'year' => (int)$this->input->post('year')
		];

		if(!empty($data)){
			$this->load->model('Book_model');
			$newBook = $this->Book_model->newBook($data);
			if($newBook == '1') {
		    	print '{"success": true, "message": "Книга успешно добавлена" }';
		    }
		    else {
		    	echo '{"success": false, "message": "Что то пошло не так"}';
		    }
		}
		else{
			echo '{"success": false, "message": "Что то пошло не так"}';
		}
	}

	public function editBook()
	{
		$data = [
			'id' => (int)$this->input->post('id'),
			'author' => (string)$this->input->post('author'),
			'name' => (string)$this->input->post('book'),
			'year' => (int)$this->input->post('year')
		];

		if(!empty($data)){
			$this->load->model('Book_model');
			$editBook = $this->Book_model->editBook($data);
			if($editBook == '1') {
		    	print '{"success": true, "message": "Книга успешно отредактирована" }';
		    }
		    else {
		    	echo '{"success": false, "message": "Что то пошло не так"}';
		    }
		}
		else{
			echo '{"success": false, "message": "Что то пошло не так"}';
		}
	}

	public function deletedBook()
	{
		$data = [
			'id' => (int)$this->input->post('id'),
		];

		if(!empty($data)){
			$this->load->model('Book_model');
			$deletedBook = $this->Book_model->deletedBook($data);
			if($editBook == '1') {
		    	print '{"success": true, "message": "Книга успешно удалена" }';
		    }
		    else {
		    	echo '{"success": false, "message": "Что то пошло не так"}';
		    }
		}
		else{
			echo '{"success": false, "message": "Что то пошло не так"}';
		}
	}

	public function exportXml()
	{
		$this->load->model('Book_model');
		$exportXml = $this->Book_model->exportXml($data);
	}
}
