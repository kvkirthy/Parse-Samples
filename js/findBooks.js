Parse.initialize("IkJNrkfxI5YhxGiWOCKomSx2OUOp7931XaRpfiKj", "mcEct3xG09pbAoYtpmaie9Ib85WNYv7aM9vaQ6XW");

$("document").ready(function(){
	$(".error").hide();
	var self = this;		
	
	$("#search").click(function(){
		var title = $("#title").val(), author = $("#author").val(), publisher = $("#publisher").val();
		var Book = Parse.Object.extend("book");
		var query = new Parse.Query(Book);
		
		
		if(author){
			query.equalTo("author", author);			
		}

		if(title){
			query.equalTo("title", title);
		}

		if(publisher){
			query.equalTo("publisher", publisher);
		}

		query.find({
			success: function(result){

				var message = "";
				if(result.length > 1){
					message = "Found " + result.length + " records. Showing first record,";
				}else if(result.length === 1){
					message = "One record found,";					
				}else{
					message = "No records found."
				}

				$("#bookCount").text(message);
				
				var row = result[0];
				$("#tAuthor").val((row || {get:function(){}}).get("author") || "");
				$("#rTitle").val((row || {get:function(){}}).get("title") || "");
				$("#tPublisher").val((row || {get:function(){}}).get("publisher") || "");
				self.searchResult = row;
				
			}
		});
	});

	$("#update").click(function(){
		if(self.searchResult){
			var row = self.searchResult;

			row.set("author", $("#tAuthor").val());
			row.set("title", $("#rTitle").val());
			row.set("publisher", $("#tPublisher").val());


			row.save(null, {
				success: function(result){
					alert("done");
				}, error: function(){
					alert("error");
				}
			})
		}
	});


	$("#delete").click(function(){
		if(self.searchResult){
			self.searchResult.destroy({
				success: function(result){
					alert("done");
				}, error: function(){
					alert("error");
				}	
			});
		}
	});

});