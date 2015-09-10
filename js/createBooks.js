
Parse.initialize("IkJNrkfxI5YhxGiWOCKomSx2OUOp7931XaRpfiKj", "mcEct3xG09pbAoYtpmaie9Ib85WNYv7aM9vaQ6XW");

$("document").ready(function(){
	$(".error").hide();
	var Book = Parse.Object.extend("book");
	var book = new Book();

	var query = new Parse.Query(Book);
	query.find({
		success: function(results){			
			for (i in results){
				var data = results[i];
				addBookRow(data.get("title"),
					data.get("author"),
					data.get("publisher"));
			}
		},
		error: function(error){
			$(".error").hide();
			console.error(error);
		}
	});

	$("#btnAddBook").click(function(){	

		var title = $("#title").val(), author = $("#author").val(), publisher = $("#publisher").val();
		book.set({title: title, author: author, publisher: publisher}, {
			success: function(data){
				console.log("success" + data);
			},
			error: function(error){
				console.log('failed' + error);
			}
		});


		  book.save(null, {
		  success: function(result) {		  	
			addBookRow(result.get("title"),
					result.get("author"),
					result.get("publisher"));
		  },
		  error: function(model, error) {
		    $(".error").show();
		  }
		});
	});

	function addBookRow( title, author, publisher){
		var row = (($("#bookList") || [])[0]).insertRow(-1);					
		(row.insertCell(0) || {}).innerHTML = title;
	    (row.insertCell(1) || {}).innerHTML = author;
	    (row.insertCell(2) || {}).innerHTML = publisher;
	}



});
