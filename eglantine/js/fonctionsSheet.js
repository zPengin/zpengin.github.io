
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
