ALTER PROCEDURE [dbo].[COPY_TABLE_DATA] @tbOld VARCHAR(100), @tbNew VARCHAR(100)
AS
BEGIN
	DECLARE @ObjectId INT
	SET @ObjectId = (SELECT ISNULL(OBJECT_ID(@tbOld), 0))
	IF @ObjectId = 0
		RETURN

	DECLARE @existIdendity INT

	DECLARE @sql VARCHAR(8000)
	DECLARE @sqlTmp VARCHAR(1000)
	DECLARE @fields VARCHAR(2000) = ''
	DECLARE @columnName VARCHAR(100)

	DECLARE rs CURSOR LOCAL SCROLL FOR  
	SELECT t2.name FROM sys.all_columns t1 INNER JOIN sys.all_columns t2 ON t1.name = t2.name 
	WHERE t1.object_id = OBJECT_ID(@tbOld) AND t2.object_id = OBJECT_ID(@tbNew) ORDER BY t2.column_id

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

	SET @existIdendity = (Select OBJECTPROPERTY(OBJECT_ID(@tbNew),'TableHasIdentity'))
	IF @existIdendity = 1 
		SET @sql = 'SET IDENTITY_INSERT ' + @tbNew + ' ON ' + CHAR(10) + @sql + CHAR(10) + 'SET IDENTITY_INSERT ' + @tbNew + ' OFF'

	PRINT @sql	
	EXEC(@sql)
END
 

GO
--EXEC dbo.COPY_TABLE_DATA 'TB1','__TMP__TB1'
--SELECT * FROM __TMP__TB1
--DELETE FROM __TMP__TB1