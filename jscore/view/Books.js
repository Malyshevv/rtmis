/**
 * Список книг
 */
Ext.define('Swan.view.Books', {
	extend: 'Ext.grid.Panel',
	id: 'storeBook',
	store: {
		proxy: {
			type: 'ajax',
			url: 'index.php/Book/loadList',
			reader: {
				type: 'json',
				idProperty: 'id'
			}
		},
		autoLoad: true,
		remoteSort: false,
		sorters: [{
			property: 'name',
			direction: 'ASC'
		}]
	},

	defaultListenerScope: true,
	tbar: [{
		text: 'Добавить',
		handler: function() {
			// todo надо реализовать добавление
			//Ext.Msg.alert('В разработке', 'Данный функционал ещё не реализован');
			    var formPanel =  {
			    	   xtype: 'form',
			    	   animCollapse: false,
       		 		   constrainHeader: true,
       		 		   iconCls: 'icon-grid',
			    	   id: 'newBook',
			    	   url: 'index.php/Book/NewBook',
				       bodyPadding: 15,
				       defaultType: 'textfield',
				       items: [{
					        fieldLabel: 'Автор',
					        name: 'author',
					        allowBlank: false
					    },{
					        fieldLabel: 'Название книги',
					        name: 'book',
					        allowBlank: false
					    },{
					    	xtype: 'numberfield',
					        fieldLabel: 'Год',
					        name: 'year',
					        allowBlank: false
					    }],
					    buttons: [{
					        text: 'Сбросить',
					        handler: function() {
					            this.up('form').getForm().reset();
					        }
					    }, {
					        text: 'Отправить',
					        formBind: true, //only enabled once the form is valid
					        disabled: true,
					        handler: function() {
					            var form = this.up('form').getForm();
					            if (form.isValid()) {
					                form.submit({
					                    success: function(form, action) {
					                       Ext.Msg.alert('Success', action.result.message);
					                       Ext.getCmp('storeBook').store.load();
					                    },
					                    failure: function(form, action) {
					                        Ext.Msg.alert('Failed', action.result.message);
					                    }
					                });
					            }
					        }
					    }],   
			    };
			Ext.create("Ext.Window",{
			       title : 'Добавления новой книги',
			       url: 'index.php/Book/newBook',
			       width : 320,                            
			       layout: 'anchor',
				   defaults: {
				   		anchor: '100%'
				   },
				   items  : [formPanel],
			       closable : true,                                               
			       modal : true
			}).show();
		}
	}, {
		text: 'Редактировать',
		handler: function() {
				var selection = Ext.getCmp('storeBook').getSelection();
				if(selection != '' ) {
				    var formPanel =  {
				    	   xtype: 'form',
				    	   animCollapse: false,
	       		 		   constrainHeader: true,
	       		 		   iconCls: 'icon-grid',
				    	   id: 'editBook',
				    	   url: 'index.php/Book/editBook',
					       bodyPadding: 15,
					       defaultType: 'textfield',
					       items: [
					        {
						        xtype: 'hiddenfield',
						        name: 'id',
						        value: selection[0].data.id
						    },
					       {
						        fieldLabel: 'Автор',
						        name: 'author',
						        value: selection[0].data.author,
						        allowBlank: false
						    },{
						        fieldLabel: 'Название книги',
						        name: 'book',
						        value: selection[0].data.name,
						        allowBlank: false
						    },{
						    	xtype: 'numberfield',
						        fieldLabel: 'Год',
						        name: 'year',
						        value: selection[0].data.year,
						        allowBlank: false
						    }],
						    buttons: [{
						        text: 'Сбросить',
						        handler: function() {
						            this.up('form').getForm().reset();
						        }
						    }, {
						        text: 'Сохранить',
						        formBind: true, //only enabled once the form is valid
						        disabled: true,
						        handler: function() {
						            var form = this.up('form').getForm();
						            if (form.isValid()) {
						                form.submit({
						                    success: function(form, action) {
						                       Ext.Msg.alert('Success', action.result.message);
						                       Ext.getCmp('storeBook').store.load();
						                    },
						                    failure: function(form, action) {
						                        Ext.Msg.alert('Failed', action.result.message);
						                    }
						                });
						            }
						        }
						    }],   
				    };
				Ext.create("Ext.Window",{
				       title : 'Редактирования книги',
				       url: 'index.php/Book/editBook',
				       width : 320,                            
				       layout: 'anchor',
					   defaults: {
					   		anchor: '100%'
					   },
					   items  : [formPanel],
				       closable : true,                                               
				       modal : true
				}).show();
			}
			else {
				Ext.Msg.alert('Редактирования', 'Сначала необходимо выбрать книгу');
			}
		}
	}, {
		text: 'Удалить',
		handler: function() {
			// todo надо реализовать удаление
			var selection = Ext.getCmp('storeBook').getSelection();
			if(selection != '' ) {
				Ext.MessageBox.show ({
				   title: 'Удаление',
				   msg: 'Вы точно хотите удалить книгу?',
				   width:300,
				   buttons: Ext.MessageBox.YESNOCANCEL,   
				   fn: function(btn){                    
			        if (btn == "no"){
			            console.log('no');            
			        }
			        if (btn == "yes"){
			            Ext.Ajax.request({
						   	url: 'index.php/Book/deletedBook',
						   	method: 'POST',
						      	params: { 
						   			id: selection[0].data.id
								},
						   	success: function(transport){
					            Ext.Msg.alert('Удаление', 'Книга удалена!');
					            Ext.getCmp('storeBook').store.load();
						   	},
						   	failure: function(transport){
						   		console.log("Error: " - transport.responseText);
						   	}
						});      
			       	}
			       }
				});
			}
			else {
				Ext.Msg.alert('Удаление', 'Сначала необходимо выбрать книгу');
			}
		}
	}, {
		text: 'Экспорт в XML',
		handler: function (button, evt)
		{
		   window.open('index.php/Book/exportXml');
		}
	}],
	columns: [
	{
		dataIndex: 'author',
		text: 'Автор',
		width: 150,
	}, {
		dataIndex: 'name',
		text: 'Название книги',
		flex: 1
	}, {
		dataIndex: 'year',
		text: 'Год издания',
		width: 150
	}],
});

Ext.define('Test.ReportWindow', {
    extend: 'Ext.window.Window',

    xfilename: '',
    xtitle: '',

    layout : 'fit',
    width: 1200,
    height: 800,
    maximizable: true,

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        me.title = me.xtitle;
        me.add(
            {
            xtype: "box",
            autoEl : {tag : "iframe", src : me.xfilename}
            }
        );
    }
});
