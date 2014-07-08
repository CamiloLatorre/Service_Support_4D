guidedModel =
{
	USUARIOS:
	{
		Pass:
		{
			onSave: function(){
				Directory.SetPassword(USUARIOS.ID_Directory, this.value);
			}
		}
	}		
};
