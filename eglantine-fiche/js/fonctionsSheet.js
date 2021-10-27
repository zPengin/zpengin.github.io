
	function see1(tab)
	{
		$('#tab1').hide();
		$('#tab2').hide();
		$('#tab3').hide();
		$('#tab4').hide();
		$('#'+tab).show();
		$('.menuTab1').removeClass('menuTabSelected');
		$('#menu'+tab).addClass('menuTabSelected');
	}

	function see2(tab)
	{
		$('#tab5').hide();
		$('#tab6').hide();
		$('#tab7').hide();
		$('#'+tab).show();
		$('.menuTab2').removeClass('menuTabSelected');
		$('#menu'+tab).addClass('menuTabSelected');
	}

	function inspiration()
	{
		$('#inspiOK').toggle();
		$('#inspiKO').toggle();
	}

	function image()
	{
		$('#privacity').hide();
		$('#ajax').hide();
		$('#upload').toggle();
	}

	function setMD()
	{
		$('#upload').hide();
		$('#ajax').hide();
		$('#privacity').toggle();
	}

	function upload(id, user_id)
	{
		var fd = new FormData();
        var files = $('#file')[0].files;
        fd.append('file', files[0]);
		fd.append('action', 'upload');
		fd.append('id', id);
		fd.append('user_id', user_id);

		if (typeof files[0] !== 'undefined')
		{
	        $.ajax({
    	        url: 'ajax_upload.php',
        	    type: 'POST',
            	data: fd,
	            contentType: false,
    	        processData: false,
      			success : function(responseText, statut)
				{ 
					$('#upload').hide();
					$('#ajax').show();
					if (responseText)
						$('#ajax').html(responseText);
					else
						$('img.image').attr("src", "pic/"+user_id+"_"+files[0].name);
				}
    		});
    	}
    }
	
	function update(id, user_id)
	{
		$('#upload').hide();
		$('#privacity').hide();
		$('#ajax').show();

		$('i.fa-save').addClass('alerte').delay(900).queue(function(next) {
			$(this).removeClass('alerte'); next();
		});
		
		var s, bool, data;

		data = "action=update&user_id=" + user_id + "&id=" + id;
		if ($('#public').is(':checked')) data += "&md=public";
		else if ($('#formd').is(':checked')) data += "&md="+$('#mymd').val();
		else data += "&md=";
		data += "&nom="+$('#nom').text() + "&classe="+$('#classe').text() + "&race="+$('#race').text() + "&backShort="+$('#backShort').text() + "&XP="+$('#XP').val() + "&XPNext="+$('#XPNext').val();
		for (var n=0; n<6; n++) data += "&carac["+n+"]="+$('#carac'+n).val();
		data += "&bonusMait="+encodeURIComponent($('#bonusMait').val()) + "&CA="+encodeURIComponent($('#CA').val()) + "&init="+encodeURIComponent($('#init').val()) + "&vit="+$('#vit').val() + "&pv="+$('#pv').val() + "&pv_used="+$('#pv_used').val() + "&DV="+$('#DV').val() + "&DV_used="+$('#DV_used').val();
		if($("#inspiOK").is(':visible')) data += "&inspi=1"; else data += "&inspi=0";
		for (var n=0; n<6; n++) 
		{
			if ($('#jdsMait'+n).is(':checked') == true) bool=1; else bool=0;
			data += "&jdsMait["+n+"]="+bool;
		}
		for (var n=0; n<6; n++) data += "&jdsBonus["+n+"]="+encodeURIComponent($('#jdsBonus'+n).val());
		data += "&percPass="+$('#percPass').val() + "&armes="+$('#armes').val() + "&armures="+$('#armures').val() + "&outils="+$('#outils').val() + "&langues="+$('#langues').val();
		for (var n=0; n<18; n++)
		{
			if ($('#compMait'+n).is(':checked') == true) bool=1; else bool=0;
			 data += "&compMait["+n+"]="+bool;
		}
		for (var n=0; n<18; n++) data += "&compBonus["+n+"]="+encodeURIComponent($('#compBonus'+n).val());
		data += "&arme0nom="+$('#arme0nom').val() + "&arme0att="+encodeURIComponent($('#arme0att').val()) + "&arme0dg="+encodeURIComponent($('#arme0dg').val());
		data += "&arme1nom="+$('#arme1nom').val() + "&arme1att="+encodeURIComponent($('#arme1att').val()) + "&arme1dg="+encodeURIComponent($('#arme1dg').val());
		data += "&arme2nom="+$('#arme2nom').val() + "&arme2att="+encodeURIComponent($('#arme2att').val()) + "&arme2dg="+encodeURIComponent($('#arme2dg').val());
		data += "&arme3nom="+$('#arme3nom').val() + "&arme3att="+encodeURIComponent($('#arme3att').val()) + "&arme3dg="+encodeURIComponent($('#arme3dg').val());
		data += "&armesDetail="+encodeURIComponent($('#armesDetail').val());
		data += "&pp="+$('#pp').val() + "&po="+$('#po').val() + "&pe="+$('#pe').val() + "&pa="+$('#pa').val() + "&pc="+$('#pc').val();
		data += "&equip="+encodeURIComponent($('#equip').val()) + "&tresors="+encodeURIComponent($('#tresors').val());
		data += "&nbreSort="+$('#nbreSort').val() + "&DDSort="+$('#DDSort').val() + "&bonusSort="+encodeURIComponent($('#bonusSort').val()) + "&caracSort="+$('#caracSort').val();

		for (var n=0; n<=9; n++)
		{
			if ($('#sorts'+n).length)
			{
				data += "&slot["+n+"]="+$('#slot'+n).val();
				data += "&slotExp["+n+"]="+$('#slotExp'+n).val();
				s= $('#sorts'+n).html();	s = s.replace (/<br>/g, "|"); s = s.replace (/<div>/g, "|");
				data += "&sortsConnus"+n+"="+encodeURIComponent(s);
				var memo = '';
				$("input[name='check"+n+"']").each(function( index ) {
					if ($(this).is(':checked') == true)
	  					memo = memo + "1|";
					else
	  					memo = memo + "0|";
				});
				data += "&sortsMem"+n+"="+memo;
			}
		}

		data += "&capacites="+encodeURIComponent($('#capacites').val()) + "&capacitesExtra="+encodeURIComponent($('#capacitesExtra').val());
		data += "&align="+$('#align').val() + "&age="+$('#age').val() + "&sexe="+$('#sexe').val() + "&taille="+$('#taille').val() + "&poids="+$('#poids').val();
		data += "&yeux="+$('#yeux').val() + "&peau="+$('#peau').val() + "&cheveux="+$('#cheveux').val() + "&apparence="+$('#apparence').val();
		data += "&traits="+encodeURIComponent($('#traits').val()) + "&ideaux="+encodeURIComponent($('#ideaux').val()) + "&liens="+encodeURIComponent($('#liens').val()) + "&defauts="+encodeURIComponent($('#defauts').val());
		data += "&backLong="+$('#backLong').val() + "&histoire="+$('#histoire').val() + "&allies="+$('#allies').val() + "&notes="+encodeURIComponent($('#notes').val());

		$.ajax({
			url : 'ajax_sheet.php',
       		type : 'POST',
       		data : data,
       		dataType : 'html', // On d�sire recevoir du HTML
       		success : function(responseText, statut)
			{ 
				$('#ajax').html(responseText);
			}
		});
	}