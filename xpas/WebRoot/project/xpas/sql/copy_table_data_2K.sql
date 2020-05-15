if exists (select * from dbo.sysobjects where id = object_id(N'[dbo].[COPY_TABLE_DATA]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[COPY_TABLE_DATA]
GO

SET QUOTED_IDENTIFIER ON 
GO
SET ANSI_NULLS ON 
GO

CREATE PROCEDURE [dbo].[COPY_TABLE_DATA] @tbOld VARCHAR(100), @tbNew VARCHAR(100)
AS
BEGIN
	DECLARE @ObjectId INT
	SET @ObjectId = (SELECT ISNULL(OBJECT_ID(@tbOld), 0))
	IF @ObjectId = 0
		RETURN

	DECLARE @existIdendity INT

	DECLARE @sql VARCHAR(8000)
	DECLARE @sqlTmp VARCHAR(1000)
	DECLARE @fields VARCHAR(2000)
	SET @fields=''
	DECLARE @columnName VARCHAR(100)

	DECLARE rs CURSOR LOCAL SCROLL FOR  
	SELECT t2.name FROM syscolumns  t1 INNER JOIN syscolumns  t2 ON t1.name = t2.name 
	WHERE t1.id = OBJECT_ID(@tbOld) AND t2.id = OBJECT_ID(@tbNew) ORDER BY t2.colid

	OPEN rs
	FETCH NEXT FROM rs INTO @columnName  	
	WHILE @@FETCH_STATUS = 0  
		BEGIN
			IF (@fields <> '')
				BEGIN
					SET @fields = @fields + ', '
				END
				
			SET @fields = @fields + @columnName
				
			FETCH NEXT FROM rs INTO @columnName
		END  
	CLOSE  rs  
	SET @sql = 'INSERT INTO ' + @tbNew + '(' + @fields + ') ' + CHAR(10) + '  SELECT ' + @fields + ' FROM ' + @tbOld + ' '
	PRINT @sql	
	SET @existIdendity = (Select OBJECTPROPERTY(OBJECT_ID(@tbNew),'TableHasIdentity'))
	IF @existIdendity = 1 
		SET @sql = 'SET IDENTITY_INSERT ' + @tbNew + ' ON ' + CHAR(10) + @sql + CHAR(10) + 'SET IDENTITY_INSERT ' + @tbNew + ' OFF'

	PRINT @sql	
	EXEC(@sql)
END
 


GO
SET QUOTED_IDENTIFIER OFF 
GO
SET ANSI_NULLS ON 
GO

