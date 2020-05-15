PRINT '表: ST_DATABASE' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_DATABASE','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_DATABASE ( 
			[database_key] varchar(20) NOT NULL,
			[database_name] varchar(20) NOT NULL,
			[database_text] varchar(30) NOT NULL,
			[database_type] varchar(20) NOT NULL,
			[database_version] varchar(10),
			[database_owner] varchar(20),
			[database_remark] varchar(200),
			[creator] varchar(20),
			[cdate] datetime,
			[modifier] varchar(20),
			[mdate] datetime
		) 
		PRINT '	创建表: ST_DATABASE' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_DATABASE','U') AND name = 'database_key') 
	BEGIN 
		ALTER TABLE ST_DATABASE ADD [database_key] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_DATABASE.database_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_DATABASE','U') AND name = 'database_name') 
	BEGIN 
		ALTER TABLE ST_DATABASE ADD [database_name] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_DATABASE.database_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_DATABASE','U') AND name = 'database_text') 
	BEGIN 
		ALTER TABLE ST_DATABASE ADD [database_text] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_DATABASE.database_text' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_DATABASE','U') AND name = 'database_type') 
	BEGIN 
		ALTER TABLE ST_DATABASE ADD [database_type] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_DATABASE.database_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_DATABASE','U') AND name = 'database_version') 
	BEGIN 
		ALTER TABLE ST_DATABASE ADD [database_version] varchar(10) 
		PRINT '	创建字段: ST_DATABASE.database_version' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_DATABASE','U') AND name = 'database_owner') 
	BEGIN 
		ALTER TABLE ST_DATABASE ADD [database_owner] varchar(20) 
		PRINT '	创建字段: ST_DATABASE.database_owner' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_DATABASE','U') AND name = 'database_remark') 
	BEGIN 
		ALTER TABLE ST_DATABASE ADD [database_remark] varchar(200) 
		PRINT '	创建字段: ST_DATABASE.database_remark' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_DATABASE','U') AND name = 'creator') 
	BEGIN 
		ALTER TABLE ST_DATABASE ADD [creator] varchar(20) 
		PRINT '	创建字段: ST_DATABASE.creator' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_DATABASE','U') AND name = 'cdate') 
	BEGIN 
		ALTER TABLE ST_DATABASE ADD [cdate] datetime 
		PRINT '	创建字段: ST_DATABASE.cdate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_DATABASE','U') AND name = 'modifier') 
	BEGIN 
		ALTER TABLE ST_DATABASE ADD [modifier] varchar(20) 
		PRINT '	创建字段: ST_DATABASE.modifier' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_DATABASE','U') AND name = 'mdate') 
	BEGIN 
		ALTER TABLE ST_DATABASE ADD [mdate] datetime 
		PRINT '	创建字段: ST_DATABASE.mdate' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_DATABASE') AND c.name = 'database_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '逻辑数据库名称|项目创建后不可修改,需和连接池名称一致','USER', 'dbo', 'TABLE', 'ST_DATABASE', 'COLUMN', 'database_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '逻辑数据库名称|项目创建后不可修改,需和连接池名称一致','USER', 'dbo', 'TABLE', 'ST_DATABASE', 'COLUMN', 'database_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_DATABASE') AND c.name = 'database_name')
	EXEC sys.sp_addextendedproperty 'MS_Description', '物理数据库名称|可以根据实际需要更换数据库名称','USER', 'dbo', 'TABLE', 'ST_DATABASE', 'COLUMN', 'database_name'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '物理数据库名称|可以根据实际需要更换数据库名称','USER', 'dbo', 'TABLE', 'ST_DATABASE', 'COLUMN', 'database_name'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_DATABASE') AND c.name = 'database_text')
	EXEC sys.sp_addextendedproperty 'MS_Description', '数据库名称','USER', 'dbo', 'TABLE', 'ST_DATABASE', 'COLUMN', 'database_text'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '数据库名称','USER', 'dbo', 'TABLE', 'ST_DATABASE', 'COLUMN', 'database_text'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_DATABASE') AND c.name = 'database_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '数据库类型','USER', 'dbo', 'TABLE', 'ST_DATABASE', 'COLUMN', 'database_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '数据库类型','USER', 'dbo', 'TABLE', 'ST_DATABASE', 'COLUMN', 'database_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_DATABASE') AND c.name = 'database_version')
	EXEC sys.sp_addextendedproperty 'MS_Description', '数据库版本','USER', 'dbo', 'TABLE', 'ST_DATABASE', 'COLUMN', 'database_version'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '数据库版本','USER', 'dbo', 'TABLE', 'ST_DATABASE', 'COLUMN', 'database_version' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_DATABASE') AND name = 'PK_ST_DATABASE') 
	BEGIN 
		ALTER TABLE ST_DATABASE ADD CONSTRAINT PK_ST_DATABASE PRIMARY KEY(database_key);
		PRINT '	创建索引: PK_ST_DATABASE' 
	END 
GO  

PRINT '表: ST_FIELD' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_FIELD','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_FIELD ( 
			[table_key] varchar(52) NOT NULL,
			[field_key] varchar(82) NOT NULL,
			[field_name] varchar(30) NOT NULL,
			[field_title] varchar(50),
			[field_type] varchar(10),
			[datatype] varchar(20),
			[field_text] varchar(50),
			[field_length] int,
			[field_scale] int DEFAULT((0)),
			[field_pkey] int,
			[field_identity] int,
			[field_nullable] int,
			[field_updatable] int,
			[field_editable] int,
			[field_default] varchar(50),
			[field_grid_format] varchar(30),
			[field_align] varchar(10),
			[field_pixel_width] int,
			[field_input_format] varchar(30),
			[field_validation_key] varchar(30),
			[field_control_type] varchar(20),
			[field_query_type] varchar(10),
			[field_query_key] varchar(30),
			[field_query_source] varchar(200),
			[field_query_order] int,
			[field_note] varchar(200),
			[field_order] int,
			[field_remark] varchar(200),
			[creator] varchar(20),
			[cdate] datetime,
			[modifier] varchar(20),
			[mdate] datetime
		) 
		PRINT '	创建表: ST_FIELD' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'table_key') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [table_key] varchar(52) NOT NULL 
		PRINT '	创建字段: ST_FIELD.table_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_key') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_key] varchar(82) NOT NULL 
		PRINT '	创建字段: ST_FIELD.field_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_name') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_name] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_FIELD.field_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_title') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_title] varchar(50) 
		PRINT '	创建字段: ST_FIELD.field_title' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_type') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_type] varchar(10) 
		PRINT '	创建字段: ST_FIELD.field_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'datatype') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [datatype] varchar(20) 
		PRINT '	创建字段: ST_FIELD.datatype' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_text') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_text] varchar(50) 
		PRINT '	创建字段: ST_FIELD.field_text' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_length') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_length] int 
		PRINT '	创建字段: ST_FIELD.field_length' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_scale') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_scale] int DEFAULT((0)) 
		PRINT '	创建字段: ST_FIELD.field_scale' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_pkey') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_pkey] int 
		PRINT '	创建字段: ST_FIELD.field_pkey' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_identity') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_identity] int 
		PRINT '	创建字段: ST_FIELD.field_identity' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_nullable') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_nullable] int 
		PRINT '	创建字段: ST_FIELD.field_nullable' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_updatable') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_updatable] int 
		PRINT '	创建字段: ST_FIELD.field_updatable' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_editable') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_editable] int 
		PRINT '	创建字段: ST_FIELD.field_editable' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_default') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_default] varchar(50) 
		PRINT '	创建字段: ST_FIELD.field_default' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_grid_format') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_grid_format] varchar(30) 
		PRINT '	创建字段: ST_FIELD.field_grid_format' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_align') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_align] varchar(10) 
		PRINT '	创建字段: ST_FIELD.field_align' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_pixel_width') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_pixel_width] int 
		PRINT '	创建字段: ST_FIELD.field_pixel_width' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_input_format') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_input_format] varchar(30) 
		PRINT '	创建字段: ST_FIELD.field_input_format' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_validation_key') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_validation_key] varchar(30) 
		PRINT '	创建字段: ST_FIELD.field_validation_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_control_type') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_control_type] varchar(20) 
		PRINT '	创建字段: ST_FIELD.field_control_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_query_type') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_query_type] varchar(10) 
		PRINT '	创建字段: ST_FIELD.field_query_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_query_key') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_query_key] varchar(30) 
		PRINT '	创建字段: ST_FIELD.field_query_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_query_source') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_query_source] varchar(200) 
		PRINT '	创建字段: ST_FIELD.field_query_source' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_query_order') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_query_order] int 
		PRINT '	创建字段: ST_FIELD.field_query_order' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_note') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_note] varchar(200) 
		PRINT '	创建字段: ST_FIELD.field_note' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_order') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_order] int 
		PRINT '	创建字段: ST_FIELD.field_order' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'field_remark') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [field_remark] varchar(200) 
		PRINT '	创建字段: ST_FIELD.field_remark' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'creator') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [creator] varchar(20) 
		PRINT '	创建字段: ST_FIELD.creator' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'cdate') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [cdate] datetime 
		PRINT '	创建字段: ST_FIELD.cdate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'modifier') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [modifier] varchar(20) 
		PRINT '	创建字段: ST_FIELD.modifier' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD','U') AND name = 'mdate') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD [mdate] datetime 
		PRINT '	创建字段: ST_FIELD.mdate' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'table_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '外键,table.table_key','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'table_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '外键,table.table_key','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'table_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_name')
	EXEC sys.sp_addextendedproperty 'MS_Description', '字段名称','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_name'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '字段名称','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_name'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_title')
	EXEC sys.sp_addextendedproperty 'MS_Description', '字段提示|显示在界面上,供用户参考','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_title'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '字段提示|显示在界面上,供用户参考','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_title'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '精简数据类型|string、datetime、number','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '精简数据类型|string、datetime、number','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'datatype')
	EXEC sys.sp_addextendedproperty 'MS_Description', '物理字段类型|数据库中的实际数据类型，与数据库有关','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'datatype'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '物理字段类型|数据库中的实际数据类型，与数据库有关','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'datatype'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_text')
	EXEC sys.sp_addextendedproperty 'MS_Description', '字段中文名称','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_text'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '字段中文名称','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_text'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_length')
	EXEC sys.sp_addextendedproperty 'MS_Description', '字段长度|字符型：长度；非整形数字：精度；其他数据类型：无效','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_length'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '字段长度|字符型：长度；非整形数字：精度；其他数据类型：无效','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_length'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_scale')
	EXEC sys.sp_addextendedproperty 'MS_Description', '小数位数','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_scale'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '小数位数','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_scale'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_pkey')
	EXEC sys.sp_addextendedproperty 'MS_Description', '是否主键字段','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_pkey'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '是否主键字段','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_pkey'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_identity')
	EXEC sys.sp_addextendedproperty 'MS_Description', '是否自增量字段','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_identity'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '是否自增量字段','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_identity'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_nullable')
	EXEC sys.sp_addextendedproperty 'MS_Description', '是否允许为空','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_nullable'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '是否允许为空','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_nullable'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_updatable')
	EXEC sys.sp_addextendedproperty 'MS_Description', '是否允许更新|例如计算列','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_updatable'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '是否允许更新|例如计算列','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_updatable'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_editable')
	EXEC sys.sp_addextendedproperty 'MS_Description', '允许手工编辑','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_editable'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '允许手工编辑','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_editable'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_default')
	EXEC sys.sp_addextendedproperty 'MS_Description', '默认值|新建记录时自动填充','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_default'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '默认值|新建记录时自动填充','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_default'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_grid_format')
	EXEC sys.sp_addextendedproperty 'MS_Description', '网格界面格式','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_grid_format'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '网格界面格式','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_grid_format'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_align')
	EXEC sys.sp_addextendedproperty 'MS_Description', '对齐方向','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_align'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '对齐方向','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_align'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_pixel_width')
	EXEC sys.sp_addextendedproperty 'MS_Description', '网格宽度','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_pixel_width'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '网格宽度','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_pixel_width'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_input_format')
	EXEC sys.sp_addextendedproperty 'MS_Description', '输入界面格式','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_input_format'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '输入界面格式','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_input_format'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_validation_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', 'field_validation.key|字段值校验规则','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_validation_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', 'field_validation.key|字段值校验规则','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_validation_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_control_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '控件类型|控件数据来源等同查询','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_control_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '控件类型|控件数据来源等同查询','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_control_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_query_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '查询类型|文本输入、选择框、日期空间、下拉框、树、自定义窗口等','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_query_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '查询类型|文本输入、选择框、日期空间、下拉框、树、自定义窗口等','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_query_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_query_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', 'field_query.key','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_query_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', 'field_query.key','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_query_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_query_source')
	EXEC sys.sp_addextendedproperty 'MS_Description', '数据源字符串或SQL语句|如果是有query_key的情况，表示为条件语句','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_query_source'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '数据源字符串或SQL语句|如果是有query_key的情况，表示为条件语句','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_query_source'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_query_order')
	EXEC sys.sp_addextendedproperty 'MS_Description', '查询序号','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_query_order'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '查询序号','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_query_order'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_note')
	EXEC sys.sp_addextendedproperty 'MS_Description', '字段数据库注释|在数据库表中的注释内容','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_note'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '字段数据库注释|在数据库表中的注释内容','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_note'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_order')
	EXEC sys.sp_addextendedproperty 'MS_Description', '序号|字段在表中的顺序','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_order'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '序号|字段在表中的顺序','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_order'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FIELD') AND c.name = 'field_remark')
	EXEC sys.sp_addextendedproperty 'MS_Description', '字段说明|供程序员参考','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_remark'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '字段说明|供程序员参考','USER', 'dbo', 'TABLE', 'ST_FIELD', 'COLUMN', 'field_remark' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_FIELD') AND name = 'PK_ST_FIELD') 
	BEGIN 
		ALTER TABLE ST_FIELD ADD CONSTRAINT PK_ST_FIELD PRIMARY KEY(field_key);
		PRINT '	创建索引: PK_ST_FIELD' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_FIELD') AND name = 'UX_ST_FIELD') 
	BEGIN 
		CREATE UNIQUE INDEX UX_ST_FIELD on ST_FIELD(field_name,table_key);
		PRINT '	创建索引: UX_ST_FIELD' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_FIELD') AND name = 'FK_ST_FIELD') 
	BEGIN 
		CREATE INDEX FK_ST_FIELD on ST_FIELD(table_key);
		PRINT '	创建索引: FK_ST_FIELD' 
	END 
GO  

PRINT '表: ST_FIELD_QUERY' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_FIELD_QUERY','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_FIELD_QUERY ( 
			[field_query_key] varchar(30) NOT NULL
		) 
		PRINT '	创建表: ST_FIELD_QUERY' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FIELD_QUERY','U') AND name = 'field_query_key') 
	BEGIN 
		ALTER TABLE ST_FIELD_QUERY ADD [field_query_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_FIELD_QUERY.field_query_key' 
	END 
 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_FIELD_QUERY') AND name = 'PK_ST_FIELD_QUERY') 
	BEGIN 
		ALTER TABLE ST_FIELD_QUERY ADD CONSTRAINT PK_ST_FIELD_QUERY PRIMARY KEY(field_query_key);
		PRINT '	创建索引: PK_ST_FIELD_QUERY' 
	END 
GO  

PRINT '表: ST_FLOW' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_FLOW','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_FLOW ( 
			[system_key] varchar(3) DEFAULT('X99') NOT NULL,
			[flow_key] varchar(30) NOT NULL,
			[flow_name] varchar(30) NOT NULL,
			[flow_root_filter] varchar(500),
			[flow_allow_batch] int DEFAULT((0)) NOT NULL,
			[flow_form_target] varchar(100),
			[flow_remark] varchar(200),
			[creator] varchar(30) NOT NULL,
			[cdate] datetime NOT NULL,
			[modifier] varchar(30),
			[mdate] datetime
		) 
		PRINT '	创建表: ST_FLOW' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW','U') AND name = 'system_key') 
	BEGIN 
		ALTER TABLE ST_FLOW ADD [system_key] varchar(3) DEFAULT('X99') NOT NULL 
		PRINT '	创建字段: ST_FLOW.system_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW','U') AND name = 'flow_key') 
	BEGIN 
		ALTER TABLE ST_FLOW ADD [flow_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_FLOW.flow_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW','U') AND name = 'flow_name') 
	BEGIN 
		ALTER TABLE ST_FLOW ADD [flow_name] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_FLOW.flow_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW','U') AND name = 'flow_root_filter') 
	BEGIN 
		ALTER TABLE ST_FLOW ADD [flow_root_filter] varchar(500) 
		PRINT '	创建字段: ST_FLOW.flow_root_filter' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW','U') AND name = 'flow_allow_batch') 
	BEGIN 
		ALTER TABLE ST_FLOW ADD [flow_allow_batch] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_FLOW.flow_allow_batch' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW','U') AND name = 'flow_form_target') 
	BEGIN 
		ALTER TABLE ST_FLOW ADD [flow_form_target] varchar(100) 
		PRINT '	创建字段: ST_FLOW.flow_form_target' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW','U') AND name = 'flow_remark') 
	BEGIN 
		ALTER TABLE ST_FLOW ADD [flow_remark] varchar(200) 
		PRINT '	创建字段: ST_FLOW.flow_remark' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW','U') AND name = 'creator') 
	BEGIN 
		ALTER TABLE ST_FLOW ADD [creator] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_FLOW.creator' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW','U') AND name = 'cdate') 
	BEGIN 
		ALTER TABLE ST_FLOW ADD [cdate] datetime NOT NULL 
		PRINT '	创建字段: ST_FLOW.cdate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW','U') AND name = 'modifier') 
	BEGIN 
		ALTER TABLE ST_FLOW ADD [modifier] varchar(30) 
		PRINT '	创建字段: ST_FLOW.modifier' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW','U') AND name = 'mdate') 
	BEGIN 
		ALTER TABLE ST_FLOW ADD [mdate] datetime 
		PRINT '	创建字段: ST_FLOW.mdate' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW') AND c.name = 'system_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '子系统|X99：框架系统，只允许developer维护','USER', 'dbo', 'TABLE', 'ST_FLOW', 'COLUMN', 'system_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '子系统|X99：框架系统，只允许developer维护','USER', 'dbo', 'TABLE', 'ST_FLOW', 'COLUMN', 'system_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW') AND c.name = 'flow_name')
	EXEC sys.sp_addextendedproperty 'MS_Description', '流程名称','USER', 'dbo', 'TABLE', 'ST_FLOW', 'COLUMN', 'flow_name'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '流程名称','USER', 'dbo', 'TABLE', 'ST_FLOW', 'COLUMN', 'flow_name'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW') AND c.name = 'flow_root_filter')
	EXEC sys.sp_addextendedproperty 'MS_Description', '流程根节点条件','USER', 'dbo', 'TABLE', 'ST_FLOW', 'COLUMN', 'flow_root_filter'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '流程根节点条件','USER', 'dbo', 'TABLE', 'ST_FLOW', 'COLUMN', 'flow_root_filter'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW') AND c.name = 'flow_allow_batch')
	EXEC sys.sp_addextendedproperty 'MS_Description', '是否允许批量操作','USER', 'dbo', 'TABLE', 'ST_FLOW', 'COLUMN', 'flow_allow_batch'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '是否允许批量操作','USER', 'dbo', 'TABLE', 'ST_FLOW', 'COLUMN', 'flow_allow_batch'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW') AND c.name = 'flow_form_target')
	EXEC sys.sp_addextendedproperty 'MS_Description', '后台类包|批量处理时，非标准编辑界面对应的后台类','USER', 'dbo', 'TABLE', 'ST_FLOW', 'COLUMN', 'flow_form_target'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '后台类包|批量处理时，非标准编辑界面对应的后台类','USER', 'dbo', 'TABLE', 'ST_FLOW', 'COLUMN', 'flow_form_target'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW') AND c.name = 'flow_remark')
	EXEC sys.sp_addextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_FLOW', 'COLUMN', 'flow_remark'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_FLOW', 'COLUMN', 'flow_remark' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_FLOW') AND name = 'PK_ST_FLOW') 
	BEGIN 
		ALTER TABLE ST_FLOW ADD CONSTRAINT PK_ST_FLOW PRIMARY KEY(flow_key);
		PRINT '	创建索引: PK_ST_FLOW' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_FLOW') AND name = 'IX_ST_FLOW') 
	BEGIN 
		CREATE UNIQUE INDEX IX_ST_FLOW on ST_FLOW(flow_name);
		PRINT '	创建索引: IX_ST_FLOW' 
	END 
GO  

PRINT '表: ST_FLOW_BUTTON' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_FLOW_BUTTON','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_FLOW_BUTTON ( 
			[flow_key] varchar(30) NOT NULL,
			[fb_key] varchar(30) NOT NULL,
			[fb_name] varchar(30) NOT NULL,
			[fb_tip] varchar(100),
			[fb_groups] varchar(100),
			[fb_users] varchar(100),
			[fb_sql_condition] varchar(100),
			[fb_field_status] varchar(30) DEFAULT('0') NOT NULL,
			[fb_status_value] int DEFAULT((1)) NOT NULL,
			[fb_field_note] varchar(30),
			[fb_field_auditor] varchar(30),
			[fb_field_adate] varchar(30),
			[fb_remove_option] int DEFAULT((1)) NOT NULL,
			[fb_inactive] int DEFAULT((0)) NOT NULL,
			[fb_order] int DEFAULT((0)) NOT NULL,
			[fb_remark] varchar(100)
		) 
		PRINT '	创建表: ST_FLOW_BUTTON' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_BUTTON','U') AND name = 'flow_key') 
	BEGIN 
		ALTER TABLE ST_FLOW_BUTTON ADD [flow_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_FLOW_BUTTON.flow_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_BUTTON','U') AND name = 'fb_key') 
	BEGIN 
		ALTER TABLE ST_FLOW_BUTTON ADD [fb_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_FLOW_BUTTON.fb_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_BUTTON','U') AND name = 'fb_name') 
	BEGIN 
		ALTER TABLE ST_FLOW_BUTTON ADD [fb_name] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_FLOW_BUTTON.fb_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_BUTTON','U') AND name = 'fb_tip') 
	BEGIN 
		ALTER TABLE ST_FLOW_BUTTON ADD [fb_tip] varchar(100) 
		PRINT '	创建字段: ST_FLOW_BUTTON.fb_tip' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_BUTTON','U') AND name = 'fb_groups') 
	BEGIN 
		ALTER TABLE ST_FLOW_BUTTON ADD [fb_groups] varchar(100) 
		PRINT '	创建字段: ST_FLOW_BUTTON.fb_groups' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_BUTTON','U') AND name = 'fb_users') 
	BEGIN 
		ALTER TABLE ST_FLOW_BUTTON ADD [fb_users] varchar(100) 
		PRINT '	创建字段: ST_FLOW_BUTTON.fb_users' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_BUTTON','U') AND name = 'fb_sql_condition') 
	BEGIN 
		ALTER TABLE ST_FLOW_BUTTON ADD [fb_sql_condition] varchar(100) 
		PRINT '	创建字段: ST_FLOW_BUTTON.fb_sql_condition' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_BUTTON','U') AND name = 'fb_field_status') 
	BEGIN 
		ALTER TABLE ST_FLOW_BUTTON ADD [fb_field_status] varchar(30) DEFAULT('0') NOT NULL 
		PRINT '	创建字段: ST_FLOW_BUTTON.fb_field_status' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_BUTTON','U') AND name = 'fb_status_value') 
	BEGIN 
		ALTER TABLE ST_FLOW_BUTTON ADD [fb_status_value] int DEFAULT((1)) NOT NULL 
		PRINT '	创建字段: ST_FLOW_BUTTON.fb_status_value' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_BUTTON','U') AND name = 'fb_field_note') 
	BEGIN 
		ALTER TABLE ST_FLOW_BUTTON ADD [fb_field_note] varchar(30) 
		PRINT '	创建字段: ST_FLOW_BUTTON.fb_field_note' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_BUTTON','U') AND name = 'fb_field_auditor') 
	BEGIN 
		ALTER TABLE ST_FLOW_BUTTON ADD [fb_field_auditor] varchar(30) 
		PRINT '	创建字段: ST_FLOW_BUTTON.fb_field_auditor' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_BUTTON','U') AND name = 'fb_field_adate') 
	BEGIN 
		ALTER TABLE ST_FLOW_BUTTON ADD [fb_field_adate] varchar(30) 
		PRINT '	创建字段: ST_FLOW_BUTTON.fb_field_adate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_BUTTON','U') AND name = 'fb_remove_option') 
	BEGIN 
		ALTER TABLE ST_FLOW_BUTTON ADD [fb_remove_option] int DEFAULT((1)) NOT NULL 
		PRINT '	创建字段: ST_FLOW_BUTTON.fb_remove_option' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_BUTTON','U') AND name = 'fb_inactive') 
	BEGIN 
		ALTER TABLE ST_FLOW_BUTTON ADD [fb_inactive] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_FLOW_BUTTON.fb_inactive' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_BUTTON','U') AND name = 'fb_order') 
	BEGIN 
		ALTER TABLE ST_FLOW_BUTTON ADD [fb_order] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_FLOW_BUTTON.fb_order' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_BUTTON','U') AND name = 'fb_remark') 
	BEGIN 
		ALTER TABLE ST_FLOW_BUTTON ADD [fb_remark] varchar(100) 
		PRINT '	创建字段: ST_FLOW_BUTTON.fb_remark' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_BUTTON') AND c.name = 'fb_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '按钮标识','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '按钮标识','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_BUTTON') AND c.name = 'fb_name')
	EXEC sys.sp_addextendedproperty 'MS_Description', '按钮名称','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_name'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '按钮名称','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_name'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_BUTTON') AND c.name = 'fb_tip')
	EXEC sys.sp_addextendedproperty 'MS_Description', '按钮提示','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_tip'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '按钮提示','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_tip'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_BUTTON') AND c.name = 'fb_groups')
	EXEC sys.sp_addextendedproperty 'MS_Description', '用户组','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_groups'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '用户组','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_groups'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_BUTTON') AND c.name = 'fb_users')
	EXEC sys.sp_addextendedproperty 'MS_Description', '用户','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_users'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '用户','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_users'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_BUTTON') AND c.name = 'fb_sql_condition')
	EXEC sys.sp_addextendedproperty 'MS_Description', '条件SQL|符合当前按钮操作的条件，SQL语法','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_sql_condition'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '条件SQL|符合当前按钮操作的条件，SQL语法','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_sql_condition'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_BUTTON') AND c.name = 'fb_field_status')
	EXEC sys.sp_addextendedproperty 'MS_Description', '状态字段','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_field_status'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '状态字段','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_field_status'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_BUTTON') AND c.name = 'fb_status_value')
	EXEC sys.sp_addextendedproperty 'MS_Description', '审核后状态值|执行该操作之后的值','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_status_value'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '审核后状态值|执行该操作之后的值','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_status_value'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_BUTTON') AND c.name = 'fb_field_note')
	EXEC sys.sp_addextendedproperty 'MS_Description', '批注字段|审核人审批时的签批内容，例如：不同意时的退回原因','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_field_note'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '批注字段|审核人审批时的签批内容，例如：不同意时的退回原因','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_field_note'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_BUTTON') AND c.name = 'fb_field_auditor')
	EXEC sys.sp_addextendedproperty 'MS_Description', '审核人字段','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_field_auditor'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '审核人字段','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_field_auditor'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_BUTTON') AND c.name = 'fb_field_adate')
	EXEC sys.sp_addextendedproperty 'MS_Description', '审核时间字段','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_field_adate'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '审核时间字段','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_field_adate'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_BUTTON') AND c.name = 'fb_remove_option')
	EXEC sys.sp_addextendedproperty 'MS_Description', '移除选项|执行操作后是否移除当前记录，默认移除','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_remove_option'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '移除选项|执行操作后是否移除当前记录，默认移除','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_remove_option'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_BUTTON') AND c.name = 'fb_inactive')
	EXEC sys.sp_addextendedproperty 'MS_Description', '禁用','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_inactive'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '禁用','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_inactive'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_BUTTON') AND c.name = 'fb_remark')
	EXEC sys.sp_addextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_remark'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_FLOW_BUTTON', 'COLUMN', 'fb_remark' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_FLOW_BUTTON') AND name = 'PK_ST_FLOW_BUTTON') 
	BEGIN 
		ALTER TABLE ST_FLOW_BUTTON ADD CONSTRAINT PK_ST_FLOW_BUTTON PRIMARY KEY(fb_key,flow_key);
		PRINT '	创建索引: PK_ST_FLOW_BUTTON' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_FLOW_BUTTON') AND name = 'IX_ST_FLOW_BUTTON_flow_key') 
	BEGIN 
		CREATE INDEX IX_ST_FLOW_BUTTON_flow_key on ST_FLOW_BUTTON(flow_key);
		PRINT '	创建索引: IX_ST_FLOW_BUTTON_flow_key' 
	END 
GO  

PRINT '表: ST_FLOW_NODE' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_FLOW_NODE','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_FLOW_NODE ( 
			[flow_key] varchar(30) NOT NULL,
			[fn_key] varchar(5) NOT NULL,
			[fn_name] varchar(30) NOT NULL,
			[fn_show_option] int DEFAULT((1)) NOT NULL,
			[fn_filter] varchar(512) NOT NULL,
			[fn_allow_addnew] int DEFAULT((0)) NOT NULL,
			[fn_allow_update] int DEFAULT((0)) NOT NULL,
			[fn_allow_delete] int DEFAULT((0)) NOT NULL,
			[fn_groups] varchar(100),
			[fn_users] varchar(100),
			[fn_inactive] int DEFAULT((0)) NOT NULL,
			[fn_order] int DEFAULT((0)) NOT NULL,
			[fn_remark] varchar(100)
		) 
		PRINT '	创建表: ST_FLOW_NODE' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_NODE','U') AND name = 'flow_key') 
	BEGIN 
		ALTER TABLE ST_FLOW_NODE ADD [flow_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_FLOW_NODE.flow_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_NODE','U') AND name = 'fn_key') 
	BEGIN 
		ALTER TABLE ST_FLOW_NODE ADD [fn_key] varchar(5) NOT NULL 
		PRINT '	创建字段: ST_FLOW_NODE.fn_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_NODE','U') AND name = 'fn_name') 
	BEGIN 
		ALTER TABLE ST_FLOW_NODE ADD [fn_name] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_FLOW_NODE.fn_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_NODE','U') AND name = 'fn_show_option') 
	BEGIN 
		ALTER TABLE ST_FLOW_NODE ADD [fn_show_option] int DEFAULT((1)) NOT NULL 
		PRINT '	创建字段: ST_FLOW_NODE.fn_show_option' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_NODE','U') AND name = 'fn_filter') 
	BEGIN 
		ALTER TABLE ST_FLOW_NODE ADD [fn_filter] varchar(512) NOT NULL 
		PRINT '	创建字段: ST_FLOW_NODE.fn_filter' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_NODE','U') AND name = 'fn_allow_addnew') 
	BEGIN 
		ALTER TABLE ST_FLOW_NODE ADD [fn_allow_addnew] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_FLOW_NODE.fn_allow_addnew' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_NODE','U') AND name = 'fn_allow_update') 
	BEGIN 
		ALTER TABLE ST_FLOW_NODE ADD [fn_allow_update] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_FLOW_NODE.fn_allow_update' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_NODE','U') AND name = 'fn_allow_delete') 
	BEGIN 
		ALTER TABLE ST_FLOW_NODE ADD [fn_allow_delete] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_FLOW_NODE.fn_allow_delete' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_NODE','U') AND name = 'fn_groups') 
	BEGIN 
		ALTER TABLE ST_FLOW_NODE ADD [fn_groups] varchar(100) 
		PRINT '	创建字段: ST_FLOW_NODE.fn_groups' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_NODE','U') AND name = 'fn_users') 
	BEGIN 
		ALTER TABLE ST_FLOW_NODE ADD [fn_users] varchar(100) 
		PRINT '	创建字段: ST_FLOW_NODE.fn_users' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_NODE','U') AND name = 'fn_inactive') 
	BEGIN 
		ALTER TABLE ST_FLOW_NODE ADD [fn_inactive] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_FLOW_NODE.fn_inactive' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_NODE','U') AND name = 'fn_order') 
	BEGIN 
		ALTER TABLE ST_FLOW_NODE ADD [fn_order] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_FLOW_NODE.fn_order' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_FLOW_NODE','U') AND name = 'fn_remark') 
	BEGIN 
		ALTER TABLE ST_FLOW_NODE ADD [fn_remark] varchar(100) 
		PRINT '	创建字段: ST_FLOW_NODE.fn_remark' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_NODE') AND c.name = 'fn_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '节点标识','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '节点标识','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_NODE') AND c.name = 'fn_name')
	EXEC sys.sp_addextendedproperty 'MS_Description', '节点名称|例如：财务待审核','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_name'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '节点名称|例如：财务待审核','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_name'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_NODE') AND c.name = 'fn_show_option')
	EXEC sys.sp_addextendedproperty 'MS_Description', '显示选项|-1：禁用；0：根据权限决定；1：显示，如无权限，SQL增加1=0','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_show_option'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '显示选项|-1：禁用；0：根据权限决定；1：显示，如无权限，SQL增加1=0','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_show_option'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_NODE') AND c.name = 'fn_filter')
	EXEC sys.sp_addextendedproperty 'MS_Description', '节点数据条件','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_filter'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '节点数据条件','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_filter'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_NODE') AND c.name = 'fn_allow_addnew')
	EXEC sys.sp_addextendedproperty 'MS_Description', '允许添加','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_allow_addnew'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '允许添加','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_allow_addnew'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_NODE') AND c.name = 'fn_allow_update')
	EXEC sys.sp_addextendedproperty 'MS_Description', '允许保存','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_allow_update'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '允许保存','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_allow_update'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_NODE') AND c.name = 'fn_allow_delete')
	EXEC sys.sp_addextendedproperty 'MS_Description', '允许删除','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_allow_delete'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '允许删除','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_allow_delete'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_NODE') AND c.name = 'fn_groups')
	EXEC sys.sp_addextendedproperty 'MS_Description', '用户组','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_groups'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '用户组','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_groups'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_NODE') AND c.name = 'fn_users')
	EXEC sys.sp_addextendedproperty 'MS_Description', '用户','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_users'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '用户','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_users'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_NODE') AND c.name = 'fn_inactive')
	EXEC sys.sp_addextendedproperty 'MS_Description', '禁用','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_inactive'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '禁用','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_inactive'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_NODE') AND c.name = 'fn_order')
	EXEC sys.sp_addextendedproperty 'MS_Description', '序号','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_order'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '序号','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_order'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_FLOW_NODE') AND c.name = 'fn_remark')
	EXEC sys.sp_addextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_remark'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_FLOW_NODE', 'COLUMN', 'fn_remark' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_FLOW_NODE') AND name = 'PK_ST_FLOW_NODE') 
	BEGIN 
		ALTER TABLE ST_FLOW_NODE ADD CONSTRAINT PK_ST_FLOW_NODE PRIMARY KEY(flow_key,fn_key);
		PRINT '	创建索引: PK_ST_FLOW_NODE' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_FLOW_NODE') AND name = 'IX_ST_FLOW_NODE') 
	BEGIN 
		CREATE UNIQUE INDEX IX_ST_FLOW_NODE on ST_FLOW_NODE(fn_name,flow_key);
		PRINT '	创建索引: IX_ST_FLOW_NODE' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_FLOW_NODE') AND name = 'FX_ST_FN_flow_key') 
	BEGIN 
		CREATE INDEX FX_ST_FN_flow_key on ST_FLOW_NODE(flow_key);
		PRINT '	创建索引: FX_ST_FN_flow_key' 
	END 
GO  

PRINT '表: ST_GROUP' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_GROUP','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_GROUP ( 
			[office_id] int NOT NULL,
			[group_key] varchar(30) NOT NULL,
			[group_name] varchar(30) NOT NULL,
			[group_inactive] int DEFAULT((0)) NOT NULL,
			[group_option1] int DEFAULT((0)) NOT NULL,
			[group_type] int DEFAULT((1)) NOT NULL,
			[group_remark] varchar(200),
			[creator] varchar(20),
			[cdate] datetime,
			[modifier] varchar(20),
			[mdate] datetime
		) 
		PRINT '	创建表: ST_GROUP' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_GROUP','U') AND name = 'office_id') 
	BEGIN 
		ALTER TABLE ST_GROUP ADD [office_id] int NOT NULL 
		PRINT '	创建字段: ST_GROUP.office_id' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_GROUP','U') AND name = 'group_key') 
	BEGIN 
		ALTER TABLE ST_GROUP ADD [group_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_GROUP.group_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_GROUP','U') AND name = 'group_name') 
	BEGIN 
		ALTER TABLE ST_GROUP ADD [group_name] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_GROUP.group_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_GROUP','U') AND name = 'group_inactive') 
	BEGIN 
		ALTER TABLE ST_GROUP ADD [group_inactive] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_GROUP.group_inactive' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_GROUP','U') AND name = 'group_option1') 
	BEGIN 
		ALTER TABLE ST_GROUP ADD [group_option1] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_GROUP.group_option1' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_GROUP','U') AND name = 'group_type') 
	BEGIN 
		ALTER TABLE ST_GROUP ADD [group_type] int DEFAULT((1)) NOT NULL 
		PRINT '	创建字段: ST_GROUP.group_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_GROUP','U') AND name = 'group_remark') 
	BEGIN 
		ALTER TABLE ST_GROUP ADD [group_remark] varchar(200) 
		PRINT '	创建字段: ST_GROUP.group_remark' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_GROUP','U') AND name = 'creator') 
	BEGIN 
		ALTER TABLE ST_GROUP ADD [creator] varchar(20) 
		PRINT '	创建字段: ST_GROUP.creator' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_GROUP','U') AND name = 'cdate') 
	BEGIN 
		ALTER TABLE ST_GROUP ADD [cdate] datetime 
		PRINT '	创建字段: ST_GROUP.cdate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_GROUP','U') AND name = 'modifier') 
	BEGIN 
		ALTER TABLE ST_GROUP ADD [modifier] varchar(20) 
		PRINT '	创建字段: ST_GROUP.modifier' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_GROUP','U') AND name = 'mdate') 
	BEGIN 
		ALTER TABLE ST_GROUP ADD [mdate] datetime 
		PRINT '	创建字段: ST_GROUP.mdate' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_GROUP') AND c.name = 'office_id')
	EXEC sys.sp_addextendedproperty 'MS_Description', '用户组所属机构ID','USER', 'dbo', 'TABLE', 'ST_GROUP', 'COLUMN', 'office_id'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '用户组所属机构ID','USER', 'dbo', 'TABLE', 'ST_GROUP', 'COLUMN', 'office_id'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_GROUP') AND c.name = 'group_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '用户组标识','USER', 'dbo', 'TABLE', 'ST_GROUP', 'COLUMN', 'group_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '用户组标识','USER', 'dbo', 'TABLE', 'ST_GROUP', 'COLUMN', 'group_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_GROUP') AND c.name = 'group_name')
	EXEC sys.sp_addextendedproperty 'MS_Description', '用户组名称','USER', 'dbo', 'TABLE', 'ST_GROUP', 'COLUMN', 'group_name'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '用户组名称','USER', 'dbo', 'TABLE', 'ST_GROUP', 'COLUMN', 'group_name'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_GROUP') AND c.name = 'group_inactive')
	EXEC sys.sp_addextendedproperty 'MS_Description', '是否禁用','USER', 'dbo', 'TABLE', 'ST_GROUP', 'COLUMN', 'group_inactive'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '是否禁用','USER', 'dbo', 'TABLE', 'ST_GROUP', 'COLUMN', 'group_inactive'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_GROUP') AND c.name = 'group_option1')
	EXEC sys.sp_addextendedproperty 'MS_Description', '下级可见|选项1：下级机构是否可见，默认不可见','USER', 'dbo', 'TABLE', 'ST_GROUP', 'COLUMN', 'group_option1'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '下级可见|选项1：下级机构是否可见，默认不可见','USER', 'dbo', 'TABLE', 'ST_GROUP', 'COLUMN', 'group_option1'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_GROUP') AND c.name = 'group_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '用户组类型|-1:开发组;0:系统内置组,例如管理员组; 1:用户自定义组','USER', 'dbo', 'TABLE', 'ST_GROUP', 'COLUMN', 'group_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '用户组类型|-1:开发组;0:系统内置组,例如管理员组; 1:用户自定义组','USER', 'dbo', 'TABLE', 'ST_GROUP', 'COLUMN', 'group_type' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_GROUP') AND name = 'PK_ST_GROUP') 
	BEGIN 
		ALTER TABLE ST_GROUP ADD CONSTRAINT PK_ST_GROUP PRIMARY KEY(group_key);
		PRINT '	创建索引: PK_ST_GROUP' 
	END 
GO  

PRINT '表: ST_GROUP_USER' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_GROUP_USER','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_GROUP_USER ( 
			[group_key] varchar(30) NOT NULL,
			[user_key] varchar(30) NOT NULL
		) 
		PRINT '	创建表: ST_GROUP_USER' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_GROUP_USER','U') AND name = 'group_key') 
	BEGIN 
		ALTER TABLE ST_GROUP_USER ADD [group_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_GROUP_USER.group_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_GROUP_USER','U') AND name = 'user_key') 
	BEGIN 
		ALTER TABLE ST_GROUP_USER ADD [user_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_GROUP_USER.user_key' 
	END 
 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_GROUP_USER') AND name = 'PK_ST_GROUP_USER') 
	BEGIN 
		ALTER TABLE ST_GROUP_USER ADD CONSTRAINT PK_ST_GROUP_USER PRIMARY KEY(group_key,user_key);
		PRINT '	创建索引: PK_ST_GROUP_USER' 
	END 
GO  

PRINT '表: ST_INDEX_FIELD' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_INDEX_FIELD','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_INDEX_FIELD ( 
			[table_key] varchar(52) NOT NULL,
			[index_name] varchar(30) NOT NULL,
			[field_name] varchar(30) NOT NULL,
			[is_unique] int NOT NULL,
			[index_type] int NOT NULL
		) 
		PRINT '	创建表: ST_INDEX_FIELD' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_INDEX_FIELD','U') AND name = 'table_key') 
	BEGIN 
		ALTER TABLE ST_INDEX_FIELD ADD [table_key] varchar(52) NOT NULL 
		PRINT '	创建字段: ST_INDEX_FIELD.table_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_INDEX_FIELD','U') AND name = 'index_name') 
	BEGIN 
		ALTER TABLE ST_INDEX_FIELD ADD [index_name] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_INDEX_FIELD.index_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_INDEX_FIELD','U') AND name = 'field_name') 
	BEGIN 
		ALTER TABLE ST_INDEX_FIELD ADD [field_name] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_INDEX_FIELD.field_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_INDEX_FIELD','U') AND name = 'is_unique') 
	BEGIN 
		ALTER TABLE ST_INDEX_FIELD ADD [is_unique] int NOT NULL 
		PRINT '	创建字段: ST_INDEX_FIELD.is_unique' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_INDEX_FIELD','U') AND name = 'index_type') 
	BEGIN 
		ALTER TABLE ST_INDEX_FIELD ADD [index_type] int NOT NULL 
		PRINT '	创建字段: ST_INDEX_FIELD.index_type' 
	END 
 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_INDEX_FIELD') AND name = 'PK_ST_INDEX_FIELD') 
	BEGIN 
		ALTER TABLE ST_INDEX_FIELD ADD CONSTRAINT PK_ST_INDEX_FIELD PRIMARY KEY(field_name,index_name,table_key);
		PRINT '	创建索引: PK_ST_INDEX_FIELD' 
	END 
GO  

PRINT '表: ST_LOG' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_LOG','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_LOG ( 
			[log_id] int IDENTITY(1,1) NOT NULL,
			[log_time] datetime DEFAULT((getdate())) NOT NULL,
			[log_type] varchar(10) NOT NULL,
			[log_user_key] varchar(20) NOT NULL,
			[log_bus_type] varchar(20) NOT NULL,
			[log_desc] varchar(512) NOT NULL
		) 
		PRINT '	创建表: ST_LOG' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_LOG','U') AND name = 'log_id') 
	BEGIN 
		ALTER TABLE ST_LOG ADD [log_id] int IDENTITY(1,1) NOT NULL 
		PRINT '	创建字段: ST_LOG.log_id' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_LOG','U') AND name = 'log_time') 
	BEGIN 
		ALTER TABLE ST_LOG ADD [log_time] datetime DEFAULT((getdate())) NOT NULL 
		PRINT '	创建字段: ST_LOG.log_time' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_LOG','U') AND name = 'log_type') 
	BEGIN 
		ALTER TABLE ST_LOG ADD [log_type] varchar(10) NOT NULL 
		PRINT '	创建字段: ST_LOG.log_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_LOG','U') AND name = 'log_user_key') 
	BEGIN 
		ALTER TABLE ST_LOG ADD [log_user_key] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_LOG.log_user_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_LOG','U') AND name = 'log_bus_type') 
	BEGIN 
		ALTER TABLE ST_LOG ADD [log_bus_type] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_LOG.log_bus_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_LOG','U') AND name = 'log_desc') 
	BEGIN 
		ALTER TABLE ST_LOG ADD [log_desc] varchar(512) NOT NULL 
		PRINT '	创建字段: ST_LOG.log_desc' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_LOG') AND c.name = 'log_time')
	EXEC sys.sp_addextendedproperty 'MS_Description', '日志时间|数据库时间','USER', 'dbo', 'TABLE', 'ST_LOG', 'COLUMN', 'log_time'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '日志时间|数据库时间','USER', 'dbo', 'TABLE', 'ST_LOG', 'COLUMN', 'log_time'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_LOG') AND c.name = 'log_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '日志类型|info、error、warn、debug','USER', 'dbo', 'TABLE', 'ST_LOG', 'COLUMN', 'log_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '日志类型|info、error、warn、debug','USER', 'dbo', 'TABLE', 'ST_LOG', 'COLUMN', 'log_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_LOG') AND c.name = 'log_bus_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '业务类型 ','USER', 'dbo', 'TABLE', 'ST_LOG', 'COLUMN', 'log_bus_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '业务类型 ','USER', 'dbo', 'TABLE', 'ST_LOG', 'COLUMN', 'log_bus_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_LOG') AND c.name = 'log_desc')
	EXEC sys.sp_addextendedproperty 'MS_Description', '日志描述','USER', 'dbo', 'TABLE', 'ST_LOG', 'COLUMN', 'log_desc'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '日志描述','USER', 'dbo', 'TABLE', 'ST_LOG', 'COLUMN', 'log_desc' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_LOG') AND name = 'PK_ST_LOG') 
	BEGIN 
		ALTER TABLE ST_LOG ADD CONSTRAINT PK_ST_LOG PRIMARY KEY(log_id);
		PRINT '	创建索引: PK_ST_LOG' 
	END 
GO  

PRINT '表: ST_MENU' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_MENU','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_MENU ( 
			[pnode_key] varchar(9) NOT NULL,
			[node_key] varchar(12) NOT NULL,
			[menu_key] varchar(30) NOT NULL,
			[menu_text] varchar(50) NOT NULL,
			[menu_type] varchar(20) NOT NULL,
			[menu_type_value] varchar(30),
			[menu_parameter] varchar(100),
			[menu_is_pc] int DEFAULT((1)) NOT NULL,
			[menu_is_app] int DEFAULT((0)) NOT NULL,
			[menu_is_pad] int DEFAULT((0)) NOT NULL,
			[menu_is_weixin] int DEFAULT((0)) NOT NULL,
			[menu_window_maximized] int DEFAULT((0)) NOT NULL,
			[menu_window_modal] int DEFAULT((0)) NOT NULL,
			[menu_filter_first] int DEFAULT((0)) NOT NULL,
			[menu_filter_must] int DEFAULT((0)) NOT NULL,
			[menu_url] varchar(100),
			[menu_tooltip] varchar(30),
			[menu_display] varchar(100),
			[menu_icon] varchar(20),
			[menu_onlyone] int,
			[menu_inactive] int DEFAULT((0)) NOT NULL,
			[menu_uview_addnew] int DEFAULT((0)) NOT NULL,
			[menu_uview_modify] int DEFAULT((0)) NOT NULL,
			[menu_uview_delete] int DEFAULT((0)) NOT NULL,
			[menu_order] int DEFAULT((999)) NOT NULL,
			[menu_sorts] varchar(15),
			[menu_remark] varchar(200),
			[creator] varchar(30),
			[cdate] datetime,
			[modifier] varchar(30),
			[mdate] datetime,
			[flow_key] varchar(30) DEFAULT('NONE'),
			[flow_text_menu] varchar(30),
			[wb_flag] int DEFAULT((0)),
			[wb_title] varchar(50),
			[wb_view_filter] varchar(100),
			[wb_area] int DEFAULT((0))
		) 
		PRINT '	创建表: ST_MENU' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'pnode_key') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [pnode_key] varchar(9) NOT NULL 
		PRINT '	创建字段: ST_MENU.pnode_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'node_key') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [node_key] varchar(12) NOT NULL 
		PRINT '	创建字段: ST_MENU.node_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_key') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_MENU.menu_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_text') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_text] varchar(50) NOT NULL 
		PRINT '	创建字段: ST_MENU.menu_text' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_type') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_type] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_MENU.menu_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_type_value') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_type_value] varchar(30) 
		PRINT '	创建字段: ST_MENU.menu_type_value' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_parameter') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_parameter] varchar(100) 
		PRINT '	创建字段: ST_MENU.menu_parameter' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_is_pc') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_is_pc] int DEFAULT((1)) NOT NULL 
		PRINT '	创建字段: ST_MENU.menu_is_pc' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_is_app') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_is_app] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_MENU.menu_is_app' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_is_pad') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_is_pad] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_MENU.menu_is_pad' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_is_weixin') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_is_weixin] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_MENU.menu_is_weixin' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_window_maximized') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_window_maximized] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_MENU.menu_window_maximized' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_window_modal') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_window_modal] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_MENU.menu_window_modal' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_filter_first') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_filter_first] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_MENU.menu_filter_first' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_filter_must') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_filter_must] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_MENU.menu_filter_must' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_url') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_url] varchar(100) 
		PRINT '	创建字段: ST_MENU.menu_url' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_tooltip') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_tooltip] varchar(30) 
		PRINT '	创建字段: ST_MENU.menu_tooltip' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_display') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_display] varchar(100) 
		PRINT '	创建字段: ST_MENU.menu_display' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_icon') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_icon] varchar(20) 
		PRINT '	创建字段: ST_MENU.menu_icon' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_onlyone') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_onlyone] int 
		PRINT '	创建字段: ST_MENU.menu_onlyone' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_inactive') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_inactive] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_MENU.menu_inactive' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_uview_addnew') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_uview_addnew] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_MENU.menu_uview_addnew' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_uview_modify') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_uview_modify] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_MENU.menu_uview_modify' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_uview_delete') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_uview_delete] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_MENU.menu_uview_delete' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_order') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_order] int DEFAULT((999)) NOT NULL 
		PRINT '	创建字段: ST_MENU.menu_order' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_sorts') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_sorts] varchar(15) 
		PRINT '	创建字段: ST_MENU.menu_sorts' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'menu_remark') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [menu_remark] varchar(200) 
		PRINT '	创建字段: ST_MENU.menu_remark' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'creator') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [creator] varchar(30) 
		PRINT '	创建字段: ST_MENU.creator' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'cdate') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [cdate] datetime 
		PRINT '	创建字段: ST_MENU.cdate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'modifier') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [modifier] varchar(30) 
		PRINT '	创建字段: ST_MENU.modifier' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'mdate') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [mdate] datetime 
		PRINT '	创建字段: ST_MENU.mdate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'flow_key') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [flow_key] varchar(30) DEFAULT('NONE') 
		PRINT '	创建字段: ST_MENU.flow_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'flow_text_menu') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [flow_text_menu] varchar(30) 
		PRINT '	创建字段: ST_MENU.flow_text_menu' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'wb_flag') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [wb_flag] int DEFAULT((0)) 
		PRINT '	创建字段: ST_MENU.wb_flag' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'wb_title') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [wb_title] varchar(50) 
		PRINT '	创建字段: ST_MENU.wb_title' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'wb_view_filter') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [wb_view_filter] varchar(100) 
		PRINT '	创建字段: ST_MENU.wb_view_filter' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU','U') AND name = 'wb_area') 
	BEGIN 
		ALTER TABLE ST_MENU ADD [wb_area] int DEFAULT((0)) 
		PRINT '	创建字段: ST_MENU.wb_area' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'pnode_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '父节点key值|一级菜单父节点key值为子系统key','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'pnode_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '父节点key值|一级菜单父节点key值为子系统key','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'pnode_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'node_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '节点key值|key值决定了菜单顺序，不建议手工操作，应通过界面调整','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'node_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '节点key值|key值决定了菜单顺序，不建议手工操作，应通过界面调整','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'node_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '菜单标识|用于程序调用及权限设置时使用，手工保证值唯一','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '菜单标识|用于程序调用及权限设置时使用，手工保证值唯一','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_text')
	EXEC sys.sp_addextendedproperty 'MS_Description', '菜单标题','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_text'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '菜单标题','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_text'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '菜单类型|window、uview、reprot、redirect and etc.','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '菜单类型|window、uview、reprot、redirect and etc.','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_type_value')
	EXEC sys.sp_addextendedproperty 'MS_Description', '菜单类型对应的值|例如：视图标识、报表标识l等','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_type_value'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '菜单类型对应的值|例如：视图标识、报表标识l等','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_type_value'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_parameter')
	EXEC sys.sp_addextendedproperty 'MS_Description', '菜单参数|例如为调用的视图增加条件','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_parameter'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '菜单参数|例如为调用的视图增加条件','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_parameter'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_is_pc')
	EXEC sys.sp_addextendedproperty 'MS_Description', 'PC端菜单','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_is_pc'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', 'PC端菜单','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_is_pc'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_is_app')
	EXEC sys.sp_addextendedproperty 'MS_Description', 'APP菜单','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_is_app'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', 'APP菜单','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_is_app'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_is_pad')
	EXEC sys.sp_addextendedproperty 'MS_Description', 'PAD端菜单','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_is_pad'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', 'PAD端菜单','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_is_pad'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_is_weixin')
	EXEC sys.sp_addextendedproperty 'MS_Description', '微信菜单','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_is_weixin'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '微信菜单','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_is_weixin'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_window_maximized')
	EXEC sys.sp_addextendedproperty 'MS_Description', '全屏窗口|0：默认值，普通窗口；1：全屏窗口','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_window_maximized'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '全屏窗口|0：默认值，普通窗口；1：全屏窗口','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_window_maximized'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_window_modal')
	EXEC sys.sp_addextendedproperty 'MS_Description', '模态窗口|0：默认值，普通窗口；1：模态窗口','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_window_modal'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '模态窗口|0：默认值，普通窗口；1：模态窗口','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_window_modal'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_filter_first')
	EXEC sys.sp_addextendedproperty 'MS_Description', '先筛选','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_filter_first'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '先筛选','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_filter_first'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_filter_must')
	EXEC sys.sp_addextendedproperty 'MS_Description', '必须有筛选','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_filter_must'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '必须有筛选','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_filter_must'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_url')
	EXEC sys.sp_addextendedproperty 'MS_Description', 'url|视图对应的编辑窗口、普通窗口url等','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_url'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', 'url|视图对应的编辑窗口、普通窗口url等','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_url'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_tooltip')
	EXEC sys.sp_addextendedproperty 'MS_Description', '菜单提示条','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_tooltip'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '菜单提示条','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_tooltip'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_display')
	EXEC sys.sp_addextendedproperty 'MS_Description', '菜单功能描述','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_display'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '菜单功能描述','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_display'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_icon')
	EXEC sys.sp_addextendedproperty 'MS_Description', '菜单图标','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_icon'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '菜单图标','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_icon'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_onlyone')
	EXEC sys.sp_addextendedproperty 'MS_Description', '只能同时打开一个|该菜单调用的功能不允许并行运行多个','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_onlyone'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '只能同时打开一个|该菜单调用的功能不允许并行运行多个','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_onlyone'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_inactive')
	EXEC sys.sp_addextendedproperty 'MS_Description', '是否禁用|1：禁用，0：启用','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_inactive'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '是否禁用|1：禁用，0：启用','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_inactive'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_uview_addnew')
	EXEC sys.sp_addextendedproperty 'MS_Description', '视图添加|0：默认值，以视图设计为准；1：允许添加；-1：不允许添加；','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_uview_addnew'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '视图添加|0：默认值，以视图设计为准；1：允许添加；-1：不允许添加；','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_uview_addnew'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_uview_modify')
	EXEC sys.sp_addextendedproperty 'MS_Description', '视图修改|0：默认值，以视图设计为准；1：允许修改；-1：不允许修改；','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_uview_modify'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '视图修改|0：默认值，以视图设计为准；1：允许修改；-1：不允许修改；','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_uview_modify'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_uview_delete')
	EXEC sys.sp_addextendedproperty 'MS_Description', '视图删除|0：默认值，以视图设计为准；1：允许删除；-1：不允许删除；','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_uview_delete'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '视图删除|0：默认值，以视图设计为准；1：允许删除；-1：不允许删除；','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_uview_delete'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_order')
	EXEC sys.sp_addextendedproperty 'MS_Description', '菜单序号','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_order'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '菜单序号','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_order'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_sorts')
	EXEC sys.sp_addextendedproperty 'MS_Description', '框架排序用|该字段准备废弃不用，菜单排序参考视图SV_MENU','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_sorts'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '框架排序用|该字段准备废弃不用，菜单排序参考视图SV_MENU','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_sorts'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'menu_remark')
	EXEC sys.sp_addextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_remark'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'menu_remark'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'flow_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '流程ID','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'flow_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '流程ID','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'flow_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'flow_text_menu')
	EXEC sys.sp_addextendedproperty 'MS_Description', '流程标题|当前菜单下的流程标题','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'flow_text_menu'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '流程标题|当前菜单下的流程标题','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'flow_text_menu'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'wb_flag')
	EXEC sys.sp_addextendedproperty 'MS_Description', '是否需要工作台提示|0:不提示','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'wb_flag'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '是否需要工作台提示|0:不提示','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'wb_flag'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'wb_title')
	EXEC sys.sp_addextendedproperty 'MS_Description', '提示内容','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'wb_title'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '提示内容','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'wb_title'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU') AND c.name = 'wb_area')
	EXEC sys.sp_addextendedproperty 'MS_Description', '所属的提示区域','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'wb_area'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '所属的提示区域','USER', 'dbo', 'TABLE', 'ST_MENU', 'COLUMN', 'wb_area' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_MENU') AND name = 'PK_ST_MENU') 
	BEGIN 
		ALTER TABLE ST_MENU ADD CONSTRAINT PK_ST_MENU PRIMARY KEY(menu_key);
		PRINT '	创建索引: PK_ST_MENU' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_MENU') AND name = 'IX_ST_MENU_node_key') 
	BEGIN 
		CREATE UNIQUE INDEX IX_ST_MENU_node_key on ST_MENU(node_key);
		PRINT '	创建索引: IX_ST_MENU_node_key' 
	END 
GO  

PRINT '表: ST_MENU_ACL' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_MENU_ACL','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_MENU_ACL ( 
			[menu_key] varchar(30) NOT NULL,
			[ug_key] varchar(30) NOT NULL,
			[ug_type] varchar(1) NOT NULL,
			[menu_acl_value] int NOT NULL
		) 
		PRINT '	创建表: ST_MENU_ACL' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU_ACL','U') AND name = 'menu_key') 
	BEGIN 
		ALTER TABLE ST_MENU_ACL ADD [menu_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_MENU_ACL.menu_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU_ACL','U') AND name = 'ug_key') 
	BEGIN 
		ALTER TABLE ST_MENU_ACL ADD [ug_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_MENU_ACL.ug_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU_ACL','U') AND name = 'ug_type') 
	BEGIN 
		ALTER TABLE ST_MENU_ACL ADD [ug_type] varchar(1) NOT NULL 
		PRINT '	创建字段: ST_MENU_ACL.ug_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_MENU_ACL','U') AND name = 'menu_acl_value') 
	BEGIN 
		ALTER TABLE ST_MENU_ACL ADD [menu_acl_value] int NOT NULL 
		PRINT '	创建字段: ST_MENU_ACL.menu_acl_value' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU_ACL') AND c.name = 'ug_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '用户（组）标识','USER', 'dbo', 'TABLE', 'ST_MENU_ACL', 'COLUMN', 'ug_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '用户（组）标识','USER', 'dbo', 'TABLE', 'ST_MENU_ACL', 'COLUMN', 'ug_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU_ACL') AND c.name = 'ug_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '用户、用户组标志|U：用户，G：用户组','USER', 'dbo', 'TABLE', 'ST_MENU_ACL', 'COLUMN', 'ug_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '用户、用户组标志|U：用户，G：用户组','USER', 'dbo', 'TABLE', 'ST_MENU_ACL', 'COLUMN', 'ug_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_MENU_ACL') AND c.name = 'menu_acl_value')
	EXEC sys.sp_addextendedproperty 'MS_Description', '对菜单的访问权限|1：有访问权限，2：部分访问权限','USER', 'dbo', 'TABLE', 'ST_MENU_ACL', 'COLUMN', 'menu_acl_value'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '对菜单的访问权限|1：有访问权限，2：部分访问权限','USER', 'dbo', 'TABLE', 'ST_MENU_ACL', 'COLUMN', 'menu_acl_value' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_MENU_ACL') AND name = 'PK_ST_MENU_ACL') 
	BEGIN 
		ALTER TABLE ST_MENU_ACL ADD CONSTRAINT PK_ST_MENU_ACL PRIMARY KEY(menu_key,ug_key,ug_type);
		PRINT '	创建索引: PK_ST_MENU_ACL' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_MENU_ACL') AND name = 'IX_ST_MENU_ACL_menu_key') 
	BEGIN 
		CREATE INDEX IX_ST_MENU_ACL_menu_key on ST_MENU_ACL(menu_key);
		PRINT '	创建索引: IX_ST_MENU_ACL_menu_key' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_MENU_ACL') AND name = 'IX_ST_MENU_ACL_ug') 
	BEGIN 
		CREATE INDEX IX_ST_MENU_ACL_ug on ST_MENU_ACL(ug_type,ug_key);
		PRINT '	创建索引: IX_ST_MENU_ACL_ug' 
	END 
GO  

PRINT '表: ST_OFFICE' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_OFFICE','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_OFFICE ( 
			[poffice_id] int NOT NULL,
			[office_id] int IDENTITY(1,1) NOT NULL,
			[office_name] varchar(50) NOT NULL,
			[office_shortname] varchar(30),
			[office_fullname] varchar(100),
			[node_key] varchar(21),
			[office_code] varchar(20),
			[office_level_type] int,
			[office_type] int DEFAULT((0)),
			[office_is_last_level] int DEFAULT((1)) NOT NULL,
			[office_hide] int DEFAULT((0)) NOT NULL,
			[office1_id] int,
			[office1_name] varchar(30),
			[office2_id] int,
			[office2_name] varchar(30),
			[office3_id] int,
			[office3_name] varchar(30),
			[office_order] int DEFAULT((999)) NOT NULL,
			[office_full_order] varchar(27),
			[office_remark] varchar(100),
			[creator] varchar(20),
			[cdate] datetime,
			[modifier] varchar(20),
			[mdate] datetime,
			[deletor] varchar(20),
			[ddate] datetime,
			[del_tag] int DEFAULT((0)) NOT NULL
		) 
		PRINT '	创建表: ST_OFFICE' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'poffice_id') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [poffice_id] int NOT NULL 
		PRINT '	创建字段: ST_OFFICE.poffice_id' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'office_id') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [office_id] int IDENTITY(1,1) NOT NULL 
		PRINT '	创建字段: ST_OFFICE.office_id' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'office_name') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [office_name] varchar(50) NOT NULL 
		PRINT '	创建字段: ST_OFFICE.office_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'office_shortname') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [office_shortname] varchar(30) 
		PRINT '	创建字段: ST_OFFICE.office_shortname' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'office_fullname') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [office_fullname] varchar(100) 
		PRINT '	创建字段: ST_OFFICE.office_fullname' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'node_key') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [node_key] varchar(21) 
		PRINT '	创建字段: ST_OFFICE.node_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'office_code') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [office_code] varchar(20) 
		PRINT '	创建字段: ST_OFFICE.office_code' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'office_level_type') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [office_level_type] int 
		PRINT '	创建字段: ST_OFFICE.office_level_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'office_type') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [office_type] int DEFAULT((0)) 
		PRINT '	创建字段: ST_OFFICE.office_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'office_is_last_level') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [office_is_last_level] int DEFAULT((1)) NOT NULL 
		PRINT '	创建字段: ST_OFFICE.office_is_last_level' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'office_hide') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [office_hide] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_OFFICE.office_hide' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'office1_id') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [office1_id] int 
		PRINT '	创建字段: ST_OFFICE.office1_id' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'office1_name') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [office1_name] varchar(30) 
		PRINT '	创建字段: ST_OFFICE.office1_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'office2_id') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [office2_id] int 
		PRINT '	创建字段: ST_OFFICE.office2_id' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'office2_name') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [office2_name] varchar(30) 
		PRINT '	创建字段: ST_OFFICE.office2_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'office3_id') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [office3_id] int 
		PRINT '	创建字段: ST_OFFICE.office3_id' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'office3_name') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [office3_name] varchar(30) 
		PRINT '	创建字段: ST_OFFICE.office3_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'office_order') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [office_order] int DEFAULT((999)) NOT NULL 
		PRINT '	创建字段: ST_OFFICE.office_order' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'office_full_order') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [office_full_order] varchar(27) 
		PRINT '	创建字段: ST_OFFICE.office_full_order' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'office_remark') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [office_remark] varchar(100) 
		PRINT '	创建字段: ST_OFFICE.office_remark' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'creator') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [creator] varchar(20) 
		PRINT '	创建字段: ST_OFFICE.creator' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'cdate') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [cdate] datetime 
		PRINT '	创建字段: ST_OFFICE.cdate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'modifier') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [modifier] varchar(20) 
		PRINT '	创建字段: ST_OFFICE.modifier' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'mdate') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [mdate] datetime 
		PRINT '	创建字段: ST_OFFICE.mdate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'deletor') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [deletor] varchar(20) 
		PRINT '	创建字段: ST_OFFICE.deletor' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'ddate') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [ddate] datetime 
		PRINT '	创建字段: ST_OFFICE.ddate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE','U') AND name = 'del_tag') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD [del_tag] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_OFFICE.del_tag' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_OFFICE') AND c.name = 'poffice_id')
	EXEC sys.sp_addextendedproperty 'MS_Description', '上级机构ID','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'poffice_id'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '上级机构ID','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'poffice_id'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_OFFICE') AND c.name = 'office_name')
	EXEC sys.sp_addextendedproperty 'MS_Description', '机构名称','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_name'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '机构名称','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_name'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_OFFICE') AND c.name = 'office_shortname')
	EXEC sys.sp_addextendedproperty 'MS_Description', '机构简称','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_shortname'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '机构简称','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_shortname'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_OFFICE') AND c.name = 'office_fullname')
	EXEC sys.sp_addextendedproperty 'MS_Description', '机构全称|机构完整层级路径','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_fullname'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '机构全称|机构完整层级路径','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_fullname'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_OFFICE') AND c.name = 'office_code')
	EXEC sys.sp_addextendedproperty 'MS_Description', '机构代码','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_code'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '机构代码','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_code'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_OFFICE') AND c.name = 'office_level_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '机构级别类型|示例：0：集团；1：企业；2：一级部门；3：二级部门','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_level_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '机构级别类型|示例：0：集团；1：企业；2：一级部门；3：二级部门','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_level_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_OFFICE') AND c.name = 'office_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '机构类型|示例：0：内部机构；1：供应商机构；2：客户机构','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '机构类型|示例：0：内部机构；1：供应商机构；2：客户机构','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_OFFICE') AND c.name = 'office_is_last_level')
	EXEC sys.sp_addextendedproperty 'MS_Description', '是否末级机构','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_is_last_level'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '是否末级机构','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_is_last_level'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_OFFICE') AND c.name = 'office_hide')
	EXEC sys.sp_addextendedproperty 'MS_Description', '禁用','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_hide'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '禁用','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_hide'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_OFFICE') AND c.name = 'office1_id')
	EXEC sys.sp_addextendedproperty 'MS_Description', '1级机构ID','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office1_id'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '1级机构ID','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office1_id'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_OFFICE') AND c.name = 'office1_name')
	EXEC sys.sp_addextendedproperty 'MS_Description', '1级机构名称','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office1_name'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '1级机构名称','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office1_name'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_OFFICE') AND c.name = 'office_order')
	EXEC sys.sp_addextendedproperty 'MS_Description', '序号','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_order'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '序号','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_order'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_OFFICE') AND c.name = 'office_full_order')
	EXEC sys.sp_addextendedproperty 'MS_Description', '全排列序号','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_full_order'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '全排列序号','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_full_order'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_OFFICE') AND c.name = 'office_remark')
	EXEC sys.sp_addextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_remark'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'office_remark'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_OFFICE') AND c.name = 'deletor')
	EXEC sys.sp_addextendedproperty 'MS_Description', '删除人','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'deletor'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '删除人','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'deletor'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_OFFICE') AND c.name = 'ddate')
	EXEC sys.sp_addextendedproperty 'MS_Description', '删除时间','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'ddate'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '删除时间','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'ddate'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_OFFICE') AND c.name = 'del_tag')
	EXEC sys.sp_addextendedproperty 'MS_Description', '删除标志','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'del_tag'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '删除标志','USER', 'dbo', 'TABLE', 'ST_OFFICE', 'COLUMN', 'del_tag' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_OFFICE') AND name = 'PK_ST_OFFICE') 
	BEGIN 
		ALTER TABLE ST_OFFICE ADD CONSTRAINT PK_ST_OFFICE PRIMARY KEY(office_id);
		PRINT '	创建索引: PK_ST_OFFICE' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_OFFICE') AND name = 'IX_ST_OFFICE_node_key') 
	BEGIN 
		CREATE UNIQUE INDEX IX_ST_OFFICE_node_key on ST_OFFICE(node_key);
		PRINT '	创建索引: IX_ST_OFFICE_node_key' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_OFFICE') AND name = 'IX_ST_OFFICE_office1_id') 
	BEGIN 
		CREATE INDEX IX_ST_OFFICE_office1_id on ST_OFFICE(office1_id);
		PRINT '	创建索引: IX_ST_OFFICE_office1_id' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_OFFICE') AND name = 'IX_ST_OFFICE_office2_id') 
	BEGIN 
		CREATE INDEX IX_ST_OFFICE_office2_id on ST_OFFICE(office2_id);
		PRINT '	创建索引: IX_ST_OFFICE_office2_id' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_OFFICE') AND name = 'IX_ST_OFFICE_office3_id') 
	BEGIN 
		CREATE INDEX IX_ST_OFFICE_office3_id on ST_OFFICE(office3_id);
		PRINT '	创建索引: IX_ST_OFFICE_office3_id' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_OFFICE') AND name = 'IX_ST_OFFICE_poffice_id') 
	BEGIN 
		CREATE INDEX IX_ST_OFFICE_poffice_id on ST_OFFICE(poffice_id);
		PRINT '	创建索引: IX_ST_OFFICE_poffice_id' 
	END 
GO  

PRINT '表: ST_OFFICE_LEVEL_TYPE' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_OFFICE_LEVEL_TYPE','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_OFFICE_LEVEL_TYPE ( 
			[office_level_type] int DEFAULT((1)) NOT NULL,
			[office_level_type_name] varchar(30) NOT NULL
		) 
		PRINT '	创建表: ST_OFFICE_LEVEL_TYPE' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE_LEVEL_TYPE','U') AND name = 'office_level_type') 
	BEGIN 
		ALTER TABLE ST_OFFICE_LEVEL_TYPE ADD [office_level_type] int DEFAULT((1)) NOT NULL 
		PRINT '	创建字段: ST_OFFICE_LEVEL_TYPE.office_level_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE_LEVEL_TYPE','U') AND name = 'office_level_type_name') 
	BEGIN 
		ALTER TABLE ST_OFFICE_LEVEL_TYPE ADD [office_level_type_name] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_OFFICE_LEVEL_TYPE.office_level_type_name' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_OFFICE_LEVEL_TYPE') AND c.name = 'office_level_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '机构级别|用户自定义机构类别，示例：0：集团；1：企业；2：分公司、一级部门；3：二级部门','USER', 'dbo', 'TABLE', 'ST_OFFICE_LEVEL_TYPE', 'COLUMN', 'office_level_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '机构级别|用户自定义机构类别，示例：0：集团；1：企业；2：分公司、一级部门；3：二级部门','USER', 'dbo', 'TABLE', 'ST_OFFICE_LEVEL_TYPE', 'COLUMN', 'office_level_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_OFFICE_LEVEL_TYPE') AND c.name = 'office_level_type_name')
	EXEC sys.sp_addextendedproperty 'MS_Description', '机构级别名称','USER', 'dbo', 'TABLE', 'ST_OFFICE_LEVEL_TYPE', 'COLUMN', 'office_level_type_name'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '机构级别名称','USER', 'dbo', 'TABLE', 'ST_OFFICE_LEVEL_TYPE', 'COLUMN', 'office_level_type_name' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_OFFICE_LEVEL_TYPE') AND name = 'PK_ST_OFFICE_LEVEL_TYPE') 
	BEGIN 
		ALTER TABLE ST_OFFICE_LEVEL_TYPE ADD CONSTRAINT PK_ST_OFFICE_LEVEL_TYPE PRIMARY KEY(office_level_type);
		PRINT '	创建索引: PK_ST_OFFICE_LEVEL_TYPE' 
	END 
GO  

PRINT '表: ST_OFFICE_TYPE' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_OFFICE_TYPE','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_OFFICE_TYPE ( 
			[office_type] int DEFAULT((0)) NOT NULL,
			[office_type_name] varchar(30) NOT NULL
		) 
		PRINT '	创建表: ST_OFFICE_TYPE' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE_TYPE','U') AND name = 'office_type') 
	BEGIN 
		ALTER TABLE ST_OFFICE_TYPE ADD [office_type] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_OFFICE_TYPE.office_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_OFFICE_TYPE','U') AND name = 'office_type_name') 
	BEGIN 
		ALTER TABLE ST_OFFICE_TYPE ADD [office_type_name] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_OFFICE_TYPE.office_type_name' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_OFFICE_TYPE') AND c.name = 'office_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '机构类别|用户自定义机构类别，示例：0：内部机构；6：供应商机构；7：客户机构','USER', 'dbo', 'TABLE', 'ST_OFFICE_TYPE', 'COLUMN', 'office_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '机构类别|用户自定义机构类别，示例：0：内部机构；6：供应商机构；7：客户机构','USER', 'dbo', 'TABLE', 'ST_OFFICE_TYPE', 'COLUMN', 'office_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_OFFICE_TYPE') AND c.name = 'office_type_name')
	EXEC sys.sp_addextendedproperty 'MS_Description', '机构类别名称','USER', 'dbo', 'TABLE', 'ST_OFFICE_TYPE', 'COLUMN', 'office_type_name'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '机构类别名称','USER', 'dbo', 'TABLE', 'ST_OFFICE_TYPE', 'COLUMN', 'office_type_name' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_OFFICE_TYPE') AND name = 'PK_ST_OFFICE_TYPE') 
	BEGIN 
		ALTER TABLE ST_OFFICE_TYPE ADD CONSTRAINT PK_ST_OFFICE_TYPE PRIMARY KEY(office_type);
		PRINT '	创建索引: PK_ST_OFFICE_TYPE' 
	END 
GO  

PRINT '表: ST_PARAMETER' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_PARAMETER','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_PARAMETER ( 
			[catalog_key] varchar(20) NOT NULL,
			[parameter_key] varchar(30) NOT NULL,
			[parameter_name] varchar(50) NOT NULL,
			[parameter_type] varchar(10) DEFAULT('o') NOT NULL,
			[parameter_order] int DEFAULT((999)) NOT NULL,
			[parameter_remark] varchar(200),
			[creator] varchar(20) NOT NULL,
			[cdate] datetime NOT NULL,
			[modifier] varchar(20),
			[mdate] datetime
		) 
		PRINT '	创建表: ST_PARAMETER' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER','U') AND name = 'catalog_key') 
	BEGIN 
		ALTER TABLE ST_PARAMETER ADD [catalog_key] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_PARAMETER.catalog_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER','U') AND name = 'parameter_key') 
	BEGIN 
		ALTER TABLE ST_PARAMETER ADD [parameter_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_PARAMETER.parameter_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER','U') AND name = 'parameter_name') 
	BEGIN 
		ALTER TABLE ST_PARAMETER ADD [parameter_name] varchar(50) NOT NULL 
		PRINT '	创建字段: ST_PARAMETER.parameter_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER','U') AND name = 'parameter_type') 
	BEGIN 
		ALTER TABLE ST_PARAMETER ADD [parameter_type] varchar(10) DEFAULT('o') NOT NULL 
		PRINT '	创建字段: ST_PARAMETER.parameter_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER','U') AND name = 'parameter_order') 
	BEGIN 
		ALTER TABLE ST_PARAMETER ADD [parameter_order] int DEFAULT((999)) NOT NULL 
		PRINT '	创建字段: ST_PARAMETER.parameter_order' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER','U') AND name = 'parameter_remark') 
	BEGIN 
		ALTER TABLE ST_PARAMETER ADD [parameter_remark] varchar(200) 
		PRINT '	创建字段: ST_PARAMETER.parameter_remark' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER','U') AND name = 'creator') 
	BEGIN 
		ALTER TABLE ST_PARAMETER ADD [creator] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_PARAMETER.creator' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER','U') AND name = 'cdate') 
	BEGIN 
		ALTER TABLE ST_PARAMETER ADD [cdate] datetime NOT NULL 
		PRINT '	创建字段: ST_PARAMETER.cdate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER','U') AND name = 'modifier') 
	BEGIN 
		ALTER TABLE ST_PARAMETER ADD [modifier] varchar(20) 
		PRINT '	创建字段: ST_PARAMETER.modifier' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER','U') AND name = 'mdate') 
	BEGIN 
		ALTER TABLE ST_PARAMETER ADD [mdate] datetime 
		PRINT '	创建字段: ST_PARAMETER.mdate' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_PARAMETER') AND c.name = 'catalog_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '参数类别标识|外键=ST_PARAMETER_CATALOG.catalog_key','USER', 'dbo', 'TABLE', 'ST_PARAMETER', 'COLUMN', 'catalog_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '参数类别标识|外键=ST_PARAMETER_CATALOG.catalog_key','USER', 'dbo', 'TABLE', 'ST_PARAMETER', 'COLUMN', 'catalog_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_PARAMETER') AND c.name = 'parameter_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '参数标识','USER', 'dbo', 'TABLE', 'ST_PARAMETER', 'COLUMN', 'parameter_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '参数标识','USER', 'dbo', 'TABLE', 'ST_PARAMETER', 'COLUMN', 'parameter_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_PARAMETER') AND c.name = 'parameter_name')
	EXEC sys.sp_addextendedproperty 'MS_Description', '参数名称','USER', 'dbo', 'TABLE', 'ST_PARAMETER', 'COLUMN', 'parameter_name'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '参数名称','USER', 'dbo', 'TABLE', 'ST_PARAMETER', 'COLUMN', 'parameter_name'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_PARAMETER') AND c.name = 'parameter_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '参数类型|g：全局参数，e：企业参数，o：其它参数（不统一维护）','USER', 'dbo', 'TABLE', 'ST_PARAMETER', 'COLUMN', 'parameter_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '参数类型|g：全局参数，e：企业参数，o：其它参数（不统一维护）','USER', 'dbo', 'TABLE', 'ST_PARAMETER', 'COLUMN', 'parameter_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_PARAMETER') AND c.name = 'parameter_order')
	EXEC sys.sp_addextendedproperty 'MS_Description', '序号','USER', 'dbo', 'TABLE', 'ST_PARAMETER', 'COLUMN', 'parameter_order'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '序号','USER', 'dbo', 'TABLE', 'ST_PARAMETER', 'COLUMN', 'parameter_order'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_PARAMETER') AND c.name = 'parameter_remark')
	EXEC sys.sp_addextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_PARAMETER', 'COLUMN', 'parameter_remark'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_PARAMETER', 'COLUMN', 'parameter_remark' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_PARAMETER') AND name = 'PK_ST_PARAMETER') 
	BEGIN 
		ALTER TABLE ST_PARAMETER ADD CONSTRAINT PK_ST_PARAMETER PRIMARY KEY(parameter_key);
		PRINT '	创建索引: PK_ST_PARAMETER' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_PARAMETER') AND name = 'IX_ST_PARAMETER') 
	BEGIN 
		CREATE INDEX IX_ST_PARAMETER on ST_PARAMETER(catalog_key);
		PRINT '	创建索引: IX_ST_PARAMETER' 
	END 
GO  

PRINT '表: ST_PARAMETER_CATALOG' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_PARAMETER_CATALOG','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_PARAMETER_CATALOG ( 
			[catalog_key] varchar(20) NOT NULL,
			[catalog_name] varchar(50) NOT NULL,
			[catalog_order] int DEFAULT((999)) NOT NULL,
			[catalog_remark] varchar(100),
			[creator] varchar(20) NOT NULL,
			[cdate] datetime NOT NULL,
			[modifier] varchar(20),
			[mdate] datetime
		) 
		PRINT '	创建表: ST_PARAMETER_CATALOG' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER_CATALOG','U') AND name = 'catalog_key') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_CATALOG ADD [catalog_key] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_PARAMETER_CATALOG.catalog_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER_CATALOG','U') AND name = 'catalog_name') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_CATALOG ADD [catalog_name] varchar(50) NOT NULL 
		PRINT '	创建字段: ST_PARAMETER_CATALOG.catalog_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER_CATALOG','U') AND name = 'catalog_order') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_CATALOG ADD [catalog_order] int DEFAULT((999)) NOT NULL 
		PRINT '	创建字段: ST_PARAMETER_CATALOG.catalog_order' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER_CATALOG','U') AND name = 'catalog_remark') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_CATALOG ADD [catalog_remark] varchar(100) 
		PRINT '	创建字段: ST_PARAMETER_CATALOG.catalog_remark' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER_CATALOG','U') AND name = 'creator') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_CATALOG ADD [creator] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_PARAMETER_CATALOG.creator' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER_CATALOG','U') AND name = 'cdate') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_CATALOG ADD [cdate] datetime NOT NULL 
		PRINT '	创建字段: ST_PARAMETER_CATALOG.cdate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER_CATALOG','U') AND name = 'modifier') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_CATALOG ADD [modifier] varchar(20) 
		PRINT '	创建字段: ST_PARAMETER_CATALOG.modifier' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER_CATALOG','U') AND name = 'mdate') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_CATALOG ADD [mdate] datetime 
		PRINT '	创建字段: ST_PARAMETER_CATALOG.mdate' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_PARAMETER_CATALOG') AND c.name = 'catalog_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '参数类别标识','USER', 'dbo', 'TABLE', 'ST_PARAMETER_CATALOG', 'COLUMN', 'catalog_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '参数类别标识','USER', 'dbo', 'TABLE', 'ST_PARAMETER_CATALOG', 'COLUMN', 'catalog_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_PARAMETER_CATALOG') AND c.name = 'catalog_name')
	EXEC sys.sp_addextendedproperty 'MS_Description', '参数类别名称','USER', 'dbo', 'TABLE', 'ST_PARAMETER_CATALOG', 'COLUMN', 'catalog_name'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '参数类别名称','USER', 'dbo', 'TABLE', 'ST_PARAMETER_CATALOG', 'COLUMN', 'catalog_name'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_PARAMETER_CATALOG') AND c.name = 'catalog_order')
	EXEC sys.sp_addextendedproperty 'MS_Description', '序号','USER', 'dbo', 'TABLE', 'ST_PARAMETER_CATALOG', 'COLUMN', 'catalog_order'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '序号','USER', 'dbo', 'TABLE', 'ST_PARAMETER_CATALOG', 'COLUMN', 'catalog_order'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_PARAMETER_CATALOG') AND c.name = 'catalog_remark')
	EXEC sys.sp_addextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_PARAMETER_CATALOG', 'COLUMN', 'catalog_remark'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_PARAMETER_CATALOG', 'COLUMN', 'catalog_remark' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_PARAMETER_CATALOG') AND name = 'PK_ST_PARAMETER_CATALOG') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_CATALOG ADD CONSTRAINT PK_ST_PARAMETER_CATALOG PRIMARY KEY(catalog_key);
		PRINT '	创建索引: PK_ST_PARAMETER_CATALOG' 
	END 
GO  

PRINT '表: ST_PARAMETER_VALUE' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_PARAMETER_VALUE','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_PARAMETER_VALUE ( 
			[eoid] int NOT NULL,
			[parameter_key] varchar(30) NOT NULL,
			[parameter_value_id] int IDENTITY(1,1) NOT NULL,
			[parameter_value] varchar(50) NOT NULL,
			[parameter_value1] varchar(50),
			[parameter_value2] varchar(50),
			[parameter_value3] varchar(50),
			[parameter_value_order] int DEFAULT((999)) NOT NULL,
			[parameter_value_remark] varchar(100),
			[creator] varchar(20) NOT NULL,
			[cdate] datetime NOT NULL,
			[modifier] varchar(20),
			[mdate] datetime
		) 
		PRINT '	创建表: ST_PARAMETER_VALUE' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER_VALUE','U') AND name = 'eoid') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_VALUE ADD [eoid] int NOT NULL 
		PRINT '	创建字段: ST_PARAMETER_VALUE.eoid' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER_VALUE','U') AND name = 'parameter_key') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_VALUE ADD [parameter_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_PARAMETER_VALUE.parameter_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER_VALUE','U') AND name = 'parameter_value_id') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_VALUE ADD [parameter_value_id] int IDENTITY(1,1) NOT NULL 
		PRINT '	创建字段: ST_PARAMETER_VALUE.parameter_value_id' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER_VALUE','U') AND name = 'parameter_value') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_VALUE ADD [parameter_value] varchar(50) NOT NULL 
		PRINT '	创建字段: ST_PARAMETER_VALUE.parameter_value' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER_VALUE','U') AND name = 'parameter_value1') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_VALUE ADD [parameter_value1] varchar(50) 
		PRINT '	创建字段: ST_PARAMETER_VALUE.parameter_value1' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER_VALUE','U') AND name = 'parameter_value2') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_VALUE ADD [parameter_value2] varchar(50) 
		PRINT '	创建字段: ST_PARAMETER_VALUE.parameter_value2' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER_VALUE','U') AND name = 'parameter_value3') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_VALUE ADD [parameter_value3] varchar(50) 
		PRINT '	创建字段: ST_PARAMETER_VALUE.parameter_value3' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER_VALUE','U') AND name = 'parameter_value_order') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_VALUE ADD [parameter_value_order] int DEFAULT((999)) NOT NULL 
		PRINT '	创建字段: ST_PARAMETER_VALUE.parameter_value_order' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER_VALUE','U') AND name = 'parameter_value_remark') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_VALUE ADD [parameter_value_remark] varchar(100) 
		PRINT '	创建字段: ST_PARAMETER_VALUE.parameter_value_remark' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER_VALUE','U') AND name = 'creator') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_VALUE ADD [creator] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_PARAMETER_VALUE.creator' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER_VALUE','U') AND name = 'cdate') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_VALUE ADD [cdate] datetime NOT NULL 
		PRINT '	创建字段: ST_PARAMETER_VALUE.cdate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER_VALUE','U') AND name = 'modifier') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_VALUE ADD [modifier] varchar(20) 
		PRINT '	创建字段: ST_PARAMETER_VALUE.modifier' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_PARAMETER_VALUE','U') AND name = 'mdate') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_VALUE ADD [mdate] datetime 
		PRINT '	创建字段: ST_PARAMETER_VALUE.mdate' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_PARAMETER_VALUE') AND c.name = 'eoid')
	EXEC sys.sp_addextendedproperty 'MS_Description', '企业ID','USER', 'dbo', 'TABLE', 'ST_PARAMETER_VALUE', 'COLUMN', 'eoid'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '企业ID','USER', 'dbo', 'TABLE', 'ST_PARAMETER_VALUE', 'COLUMN', 'eoid'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_PARAMETER_VALUE') AND c.name = 'parameter_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '参数标识','USER', 'dbo', 'TABLE', 'ST_PARAMETER_VALUE', 'COLUMN', 'parameter_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '参数标识','USER', 'dbo', 'TABLE', 'ST_PARAMETER_VALUE', 'COLUMN', 'parameter_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_PARAMETER_VALUE') AND c.name = 'parameter_value_id')
	EXEC sys.sp_addextendedproperty 'MS_Description', '主键','USER', 'dbo', 'TABLE', 'ST_PARAMETER_VALUE', 'COLUMN', 'parameter_value_id'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '主键','USER', 'dbo', 'TABLE', 'ST_PARAMETER_VALUE', 'COLUMN', 'parameter_value_id'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_PARAMETER_VALUE') AND c.name = 'parameter_value')
	EXEC sys.sp_addextendedproperty 'MS_Description', '参数值','USER', 'dbo', 'TABLE', 'ST_PARAMETER_VALUE', 'COLUMN', 'parameter_value'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '参数值','USER', 'dbo', 'TABLE', 'ST_PARAMETER_VALUE', 'COLUMN', 'parameter_value'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_PARAMETER_VALUE') AND c.name = 'parameter_value1')
	EXEC sys.sp_addextendedproperty 'MS_Description', '参数值1','USER', 'dbo', 'TABLE', 'ST_PARAMETER_VALUE', 'COLUMN', 'parameter_value1'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '参数值1','USER', 'dbo', 'TABLE', 'ST_PARAMETER_VALUE', 'COLUMN', 'parameter_value1'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_PARAMETER_VALUE') AND c.name = 'parameter_value2')
	EXEC sys.sp_addextendedproperty 'MS_Description', '参数值2','USER', 'dbo', 'TABLE', 'ST_PARAMETER_VALUE', 'COLUMN', 'parameter_value2'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '参数值2','USER', 'dbo', 'TABLE', 'ST_PARAMETER_VALUE', 'COLUMN', 'parameter_value2'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_PARAMETER_VALUE') AND c.name = 'parameter_value3')
	EXEC sys.sp_addextendedproperty 'MS_Description', '参数值3','USER', 'dbo', 'TABLE', 'ST_PARAMETER_VALUE', 'COLUMN', 'parameter_value3'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '参数值3','USER', 'dbo', 'TABLE', 'ST_PARAMETER_VALUE', 'COLUMN', 'parameter_value3'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_PARAMETER_VALUE') AND c.name = 'parameter_value_order')
	EXEC sys.sp_addextendedproperty 'MS_Description', '序号','USER', 'dbo', 'TABLE', 'ST_PARAMETER_VALUE', 'COLUMN', 'parameter_value_order'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '序号','USER', 'dbo', 'TABLE', 'ST_PARAMETER_VALUE', 'COLUMN', 'parameter_value_order'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_PARAMETER_VALUE') AND c.name = 'parameter_value_remark')
	EXEC sys.sp_addextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_PARAMETER_VALUE', 'COLUMN', 'parameter_value_remark'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_PARAMETER_VALUE', 'COLUMN', 'parameter_value_remark' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_PARAMETER_VALUE') AND name = 'PK_ST_PARAMETER_VALUE') 
	BEGIN 
		ALTER TABLE ST_PARAMETER_VALUE ADD CONSTRAINT PK_ST_PARAMETER_VALUE PRIMARY KEY(parameter_value_id);
		PRINT '	创建索引: PK_ST_PARAMETER_VALUE' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_PARAMETER_VALUE') AND name = 'IX_ST_PARAMETER_VALUE') 
	BEGIN 
		CREATE UNIQUE INDEX IX_ST_PARAMETER_VALUE on ST_PARAMETER_VALUE(parameter_value,eoid,parameter_key);
		PRINT '	创建索引: IX_ST_PARAMETER_VALUE' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_PARAMETER_VALUE') AND name = 'IX_ST_PARAMETER_VALUE_1') 
	BEGIN 
		CREATE INDEX IX_ST_PARAMETER_VALUE_1 on ST_PARAMETER_VALUE(parameter_key);
		PRINT '	创建索引: IX_ST_PARAMETER_VALUE_1' 
	END 
GO  

PRINT '表: ST_REPORT' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_REPORT','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_REPORT ( 
			[system_key] varchar(20) NOT NULL,
			[report_key] varchar(50) NOT NULL,
			[database_key] varchar(20) NOT NULL,
			[report_title] varchar(50) NOT NULL,
			[report_type] int DEFAULT((1)) NOT NULL,
			[report_data_source_type] varchar(10) DEFAULT('sql') NOT NULL,
			[report_data_source] varchar(1024) NOT NULL,
			[report_sum_count] int DEFAULT((0)) NOT NULL,
			[report_bottom] varchar(50),
			[report_paper_type] varchar(20) DEFAULT('A4'),
			[report_remark] varchar(200),
			[creator] varchar(30),
			[cdate] datetime,
			[modifier] varchar(30),
			[mdate] datetime
		) 
		PRINT '	创建表: ST_REPORT' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT','U') AND name = 'system_key') 
	BEGIN 
		ALTER TABLE ST_REPORT ADD [system_key] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_REPORT.system_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT','U') AND name = 'report_key') 
	BEGIN 
		ALTER TABLE ST_REPORT ADD [report_key] varchar(50) NOT NULL 
		PRINT '	创建字段: ST_REPORT.report_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT','U') AND name = 'database_key') 
	BEGIN 
		ALTER TABLE ST_REPORT ADD [database_key] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_REPORT.database_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT','U') AND name = 'report_title') 
	BEGIN 
		ALTER TABLE ST_REPORT ADD [report_title] varchar(50) NOT NULL 
		PRINT '	创建字段: ST_REPORT.report_title' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT','U') AND name = 'report_type') 
	BEGIN 
		ALTER TABLE ST_REPORT ADD [report_type] int DEFAULT((1)) NOT NULL 
		PRINT '	创建字段: ST_REPORT.report_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT','U') AND name = 'report_data_source_type') 
	BEGIN 
		ALTER TABLE ST_REPORT ADD [report_data_source_type] varchar(10) DEFAULT('sql') NOT NULL 
		PRINT '	创建字段: ST_REPORT.report_data_source_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT','U') AND name = 'report_data_source') 
	BEGIN 
		ALTER TABLE ST_REPORT ADD [report_data_source] varchar(1024) NOT NULL 
		PRINT '	创建字段: ST_REPORT.report_data_source' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT','U') AND name = 'report_sum_count') 
	BEGIN 
		ALTER TABLE ST_REPORT ADD [report_sum_count] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_REPORT.report_sum_count' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT','U') AND name = 'report_bottom') 
	BEGIN 
		ALTER TABLE ST_REPORT ADD [report_bottom] varchar(50) 
		PRINT '	创建字段: ST_REPORT.report_bottom' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT','U') AND name = 'report_paper_type') 
	BEGIN 
		ALTER TABLE ST_REPORT ADD [report_paper_type] varchar(20) DEFAULT('A4') 
		PRINT '	创建字段: ST_REPORT.report_paper_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT','U') AND name = 'report_remark') 
	BEGIN 
		ALTER TABLE ST_REPORT ADD [report_remark] varchar(200) 
		PRINT '	创建字段: ST_REPORT.report_remark' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT','U') AND name = 'creator') 
	BEGIN 
		ALTER TABLE ST_REPORT ADD [creator] varchar(30) 
		PRINT '	创建字段: ST_REPORT.creator' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT','U') AND name = 'cdate') 
	BEGIN 
		ALTER TABLE ST_REPORT ADD [cdate] datetime 
		PRINT '	创建字段: ST_REPORT.cdate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT','U') AND name = 'modifier') 
	BEGIN 
		ALTER TABLE ST_REPORT ADD [modifier] varchar(30) 
		PRINT '	创建字段: ST_REPORT.modifier' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT','U') AND name = 'mdate') 
	BEGIN 
		ALTER TABLE ST_REPORT ADD [mdate] datetime 
		PRINT '	创建字段: ST_REPORT.mdate' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT') AND c.name = 'report_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '报表标识','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'report_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '报表标识','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'report_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT') AND c.name = 'database_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '逻辑数据库','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'database_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '逻辑数据库','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'database_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT') AND c.name = 'report_title')
	EXEC sys.sp_addextendedproperty 'MS_Description', '报表标题','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'report_title'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '报表标题','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'report_title'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT') AND c.name = 'report_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '报表类型|1：汇总表，0：明细表','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'report_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '报表类型|1：汇总表，0：明细表','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'report_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT') AND c.name = 'report_data_source_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '数据源类型|sql，st_view','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'report_data_source_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '数据源类型|sql，st_view','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'report_data_source_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT') AND c.name = 'report_data_source')
	EXEC sys.sp_addextendedproperty 'MS_Description', '数据源|sql：SQL语句，st_view：数据视图','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'report_data_source'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '数据源|sql：SQL语句，st_view：数据视图','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'report_data_source'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT') AND c.name = 'report_sum_count')
	EXEC sys.sp_addextendedproperty 'MS_Description', '行合计层数|-1：无合计；0：仅总计；1：分计；2：小计...','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'report_sum_count'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '行合计层数|-1：无合计；0：仅总计；1：分计；2：小计...','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'report_sum_count'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT') AND c.name = 'report_bottom')
	EXEC sys.sp_addextendedproperty 'MS_Description', '报表脚注','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'report_bottom'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '报表脚注','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'report_bottom'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT') AND c.name = 'report_paper_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '纸张类型','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'report_paper_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '纸张类型','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'report_paper_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT') AND c.name = 'report_remark')
	EXEC sys.sp_addextendedproperty 'MS_Description', '备注说明','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'report_remark'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '备注说明','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'report_remark'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT') AND c.name = 'creator')
	EXEC sys.sp_addextendedproperty 'MS_Description', '创建者','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'creator'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '创建者','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'creator'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT') AND c.name = 'cdate')
	EXEC sys.sp_addextendedproperty 'MS_Description', '创建时间','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'cdate'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '创建时间','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'cdate'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT') AND c.name = 'modifier')
	EXEC sys.sp_addextendedproperty 'MS_Description', '最后修改人','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'modifier'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '最后修改人','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'modifier'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT') AND c.name = 'mdate')
	EXEC sys.sp_addextendedproperty 'MS_Description', '最后修改时间','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'mdate'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '最后修改时间','USER', 'dbo', 'TABLE', 'ST_REPORT', 'COLUMN', 'mdate' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_REPORT') AND name = 'PK_ST_REPORT') 
	BEGIN 
		ALTER TABLE ST_REPORT ADD CONSTRAINT PK_ST_REPORT PRIMARY KEY(report_key);
		PRINT '	创建索引: PK_ST_REPORT' 
	END 
GO  

PRINT '表: ST_REPORT_COLUMN' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_REPORT_COLUMN','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_REPORT_COLUMN ( 
			[report_key] varchar(50) NOT NULL,
			[report_column_key] varchar(30) NOT NULL,
			[rc_under_key] varchar(30),
			[rc_sort_key] varchar(30),
			[rc_name] varchar(30) NOT NULL,
			[rc_rdc_type] varchar(3) DEFAULT('RDC') NOT NULL,
			[rc_rdc] varchar(1) NOT NULL,
			[rc_index] int DEFAULT((0)) NOT NULL,
			[rc_selected] int DEFAULT((0)) NOT NULL,
			[rc_fieldtype] varchar(20) NOT NULL,
			[rc_datatype] varchar(20) DEFAULT('String') NOT NULL,
			[rc_is_formula_col] int DEFAULT((0)) NOT NULL,
			[rc_formula] varchar(200),
			[rc_formula_row] varchar(20),
			[rc_formula_col] varchar(20),
			[rc_formula_col_count] int DEFAULT((-1)),
			[rc_formula_row_col] varchar(1),
			[rc_width] int DEFAULT((80)),
			[rc_format] varchar(20),
			[rc_format_xls] varchar(20),
			[rc_allow_config] int DEFAULT((1)) NOT NULL
		) 
		PRINT '	创建表: ST_REPORT_COLUMN' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN','U') AND name = 'report_key') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD [report_key] varchar(50) NOT NULL 
		PRINT '	创建字段: ST_REPORT_COLUMN.report_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN','U') AND name = 'report_column_key') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD [report_column_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_REPORT_COLUMN.report_column_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN','U') AND name = 'rc_under_key') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD [rc_under_key] varchar(30) 
		PRINT '	创建字段: ST_REPORT_COLUMN.rc_under_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN','U') AND name = 'rc_sort_key') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD [rc_sort_key] varchar(30) 
		PRINT '	创建字段: ST_REPORT_COLUMN.rc_sort_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN','U') AND name = 'rc_name') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD [rc_name] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_REPORT_COLUMN.rc_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN','U') AND name = 'rc_rdc_type') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD [rc_rdc_type] varchar(3) DEFAULT('RDC') NOT NULL 
		PRINT '	创建字段: ST_REPORT_COLUMN.rc_rdc_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN','U') AND name = 'rc_rdc') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD [rc_rdc] varchar(1) NOT NULL 
		PRINT '	创建字段: ST_REPORT_COLUMN.rc_rdc' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN','U') AND name = 'rc_index') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD [rc_index] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_REPORT_COLUMN.rc_index' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN','U') AND name = 'rc_selected') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD [rc_selected] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_REPORT_COLUMN.rc_selected' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN','U') AND name = 'rc_fieldtype') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD [rc_fieldtype] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_REPORT_COLUMN.rc_fieldtype' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN','U') AND name = 'rc_datatype') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD [rc_datatype] varchar(20) DEFAULT('String') NOT NULL 
		PRINT '	创建字段: ST_REPORT_COLUMN.rc_datatype' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN','U') AND name = 'rc_is_formula_col') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD [rc_is_formula_col] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_REPORT_COLUMN.rc_is_formula_col' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN','U') AND name = 'rc_formula') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD [rc_formula] varchar(200) 
		PRINT '	创建字段: ST_REPORT_COLUMN.rc_formula' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN','U') AND name = 'rc_formula_row') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD [rc_formula_row] varchar(20) 
		PRINT '	创建字段: ST_REPORT_COLUMN.rc_formula_row' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN','U') AND name = 'rc_formula_col') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD [rc_formula_col] varchar(20) 
		PRINT '	创建字段: ST_REPORT_COLUMN.rc_formula_col' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN','U') AND name = 'rc_formula_col_count') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD [rc_formula_col_count] int DEFAULT((-1)) 
		PRINT '	创建字段: ST_REPORT_COLUMN.rc_formula_col_count' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN','U') AND name = 'rc_formula_row_col') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD [rc_formula_row_col] varchar(1) 
		PRINT '	创建字段: ST_REPORT_COLUMN.rc_formula_row_col' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN','U') AND name = 'rc_width') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD [rc_width] int DEFAULT((80)) 
		PRINT '	创建字段: ST_REPORT_COLUMN.rc_width' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN','U') AND name = 'rc_format') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD [rc_format] varchar(20) 
		PRINT '	创建字段: ST_REPORT_COLUMN.rc_format' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN','U') AND name = 'rc_format_xls') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD [rc_format_xls] varchar(20) 
		PRINT '	创建字段: ST_REPORT_COLUMN.rc_format_xls' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN','U') AND name = 'rc_allow_config') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD [rc_allow_config] int DEFAULT((1)) NOT NULL 
		PRINT '	创建字段: ST_REPORT_COLUMN.rc_allow_config' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT_COLUMN') AND c.name = 'report_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '报表名称','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'report_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '报表名称','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'report_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT_COLUMN') AND c.name = 'report_column_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '显示字段标识','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'report_column_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '显示字段标识','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'report_column_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT_COLUMN') AND c.name = 'rc_under_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '底层字段标识|显示为中文值，底层实际为关键字字段值','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_under_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '底层字段标识|显示为中文值，底层实际为关键字字段值','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_under_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT_COLUMN') AND c.name = 'rc_sort_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '排序字段标识','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_sort_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '排序字段标识','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_sort_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT_COLUMN') AND c.name = 'rc_name')
	EXEC sys.sp_addextendedproperty 'MS_Description', '字段名称','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_name'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '字段名称','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_name'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT_COLUMN') AND c.name = 'rc_rdc_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '允许配置的区域类型|R：行分组区，D：数据区，C：列分组区','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_rdc_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '允许配置的区域类型|R：行分组区，D：数据区，C：列分组区','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_rdc_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT_COLUMN') AND c.name = 'rc_rdc')
	EXEC sys.sp_addextendedproperty 'MS_Description', '区域位置','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_rdc'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '区域位置','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_rdc'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT_COLUMN') AND c.name = 'rc_index')
	EXEC sys.sp_addextendedproperty 'MS_Description', '序号|从左到右，从上到下','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_index'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '序号|从左到右，从上到下','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_index'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT_COLUMN') AND c.name = 'rc_selected')
	EXEC sys.sp_addextendedproperty 'MS_Description', '输出标志','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_selected'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '输出标志','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_selected'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT_COLUMN') AND c.name = 'rc_fieldtype')
	EXEC sys.sp_addextendedproperty 'MS_Description', '字段类型|string、number、datetime等','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_fieldtype'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '字段类型|string、number、datetime等','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_fieldtype'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT_COLUMN') AND c.name = 'rc_datatype')
	EXEC sys.sp_addextendedproperty 'MS_Description', '数据类型|varchar、int、float等','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_datatype'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '数据类型|varchar、int、float等','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_datatype'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT_COLUMN') AND c.name = 'rc_is_formula_col')
	EXEC sys.sp_addextendedproperty 'MS_Description', '是否公式列|1：是；0：否','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_is_formula_col'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '是否公式列|1：是；0：否','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_is_formula_col'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT_COLUMN') AND c.name = 'rc_formula')
	EXEC sys.sp_addextendedproperty 'MS_Description', '单元格列公式表达式|后缀表达式(e.g. =,/,金额,数量)或常量','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_formula'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '单元格列公式表达式|后缀表达式(e.g. =,/,金额,数量)或常量','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_formula'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT_COLUMN') AND c.name = 'rc_formula_row')
	EXEC sys.sp_addextendedproperty 'MS_Description', '行分组组公式|sum、AVERAGE、count','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_formula_row'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '行分组组公式|sum、AVERAGE、count','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_formula_row'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT_COLUMN') AND c.name = 'rc_formula_col')
	EXEC sys.sp_addextendedproperty 'MS_Description', '列分组组公式|sum、avg、count','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_formula_col'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '列分组组公式|sum、avg、count','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_formula_col'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT_COLUMN') AND c.name = 'rc_formula_col_count')
	EXEC sys.sp_addextendedproperty 'MS_Description', '列公式层数|当前字段列公式层数，-1：不合计；0：仅总计；1：分计；2：小计...','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_formula_col_count'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '列公式层数|当前字段列公式层数，-1：不合计；0：仅总计；1：分计；2：小计...','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_formula_col_count'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT_COLUMN') AND c.name = 'rc_formula_row_col')
	EXEC sys.sp_addextendedproperty 'MS_Description', '行列分组交叉单元格公式|R：行公式；C：列公式；N：无公式','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_formula_row_col'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '行列分组交叉单元格公式|R：行公式；C：列公式；N：无公式','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_formula_row_col'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT_COLUMN') AND c.name = 'rc_width')
	EXEC sys.sp_addextendedproperty 'MS_Description', '字段宽度','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_width'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '字段宽度','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_width'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT_COLUMN') AND c.name = 'rc_format')
	EXEC sys.sp_addextendedproperty 'MS_Description', '显示格式','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_format'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '显示格式','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_format'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT_COLUMN') AND c.name = 'rc_format_xls')
	EXEC sys.sp_addextendedproperty 'MS_Description', 'Excel显示格式','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_format_xls'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', 'Excel显示格式','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_format_xls'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_REPORT_COLUMN') AND c.name = 'rc_allow_config')
	EXEC sys.sp_addextendedproperty 'MS_Description', '允许配置|例如：ID列，排序列等不允许配置，不显示在配置界面上','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_allow_config'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '允许配置|例如：ID列，排序列等不允许配置，不显示在配置界面上','USER', 'dbo', 'TABLE', 'ST_REPORT_COLUMN', 'COLUMN', 'rc_allow_config' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN') AND name = 'PK_ST_REPORT_COLUMN') 
	BEGIN 
		ALTER TABLE ST_REPORT_COLUMN ADD CONSTRAINT PK_ST_REPORT_COLUMN PRIMARY KEY(report_column_key,report_key);
		PRINT '	创建索引: PK_ST_REPORT_COLUMN' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_REPORT_COLUMN') AND name = 'IX_ST_REPORT_COLUMN_report_key') 
	BEGIN 
		CREATE INDEX IX_ST_REPORT_COLUMN_report_key on ST_REPORT_COLUMN(report_key);
		PRINT '	创建索引: IX_ST_REPORT_COLUMN_report_key' 
	END 
GO  

PRINT '表: ST_SYS_PARA' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_SYS_PARA','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_SYS_PARA ( 
			[sys_para_key] varchar(30) NOT NULL,
			[sys_para_name] varchar(30) NOT NULL,
			[sys_para_value] varchar(50) NOT NULL,
			[sys_para_remark] varchar(200)
		) 
		PRINT '	创建表: ST_SYS_PARA' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_SYS_PARA','U') AND name = 'sys_para_key') 
	BEGIN 
		ALTER TABLE ST_SYS_PARA ADD [sys_para_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_SYS_PARA.sys_para_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_SYS_PARA','U') AND name = 'sys_para_name') 
	BEGIN 
		ALTER TABLE ST_SYS_PARA ADD [sys_para_name] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_SYS_PARA.sys_para_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_SYS_PARA','U') AND name = 'sys_para_value') 
	BEGIN 
		ALTER TABLE ST_SYS_PARA ADD [sys_para_value] varchar(50) NOT NULL 
		PRINT '	创建字段: ST_SYS_PARA.sys_para_value' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_SYS_PARA','U') AND name = 'sys_para_remark') 
	BEGIN 
		ALTER TABLE ST_SYS_PARA ADD [sys_para_remark] varchar(200) 
		PRINT '	创建字段: ST_SYS_PARA.sys_para_remark' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_SYS_PARA') AND c.name = 'sys_para_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '参数标识','USER', 'dbo', 'TABLE', 'ST_SYS_PARA', 'COLUMN', 'sys_para_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '参数标识','USER', 'dbo', 'TABLE', 'ST_SYS_PARA', 'COLUMN', 'sys_para_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_SYS_PARA') AND c.name = 'sys_para_name')
	EXEC sys.sp_addextendedproperty 'MS_Description', '参数名称','USER', 'dbo', 'TABLE', 'ST_SYS_PARA', 'COLUMN', 'sys_para_name'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '参数名称','USER', 'dbo', 'TABLE', 'ST_SYS_PARA', 'COLUMN', 'sys_para_name'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_SYS_PARA') AND c.name = 'sys_para_value')
	EXEC sys.sp_addextendedproperty 'MS_Description', '参数值','USER', 'dbo', 'TABLE', 'ST_SYS_PARA', 'COLUMN', 'sys_para_value'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '参数值','USER', 'dbo', 'TABLE', 'ST_SYS_PARA', 'COLUMN', 'sys_para_value'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_SYS_PARA') AND c.name = 'sys_para_remark')
	EXEC sys.sp_addextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_SYS_PARA', 'COLUMN', 'sys_para_remark'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_SYS_PARA', 'COLUMN', 'sys_para_remark' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_SYS_PARA') AND name = 'PK_ST_SYS_PARA') 
	BEGIN 
		ALTER TABLE ST_SYS_PARA ADD CONSTRAINT PK_ST_SYS_PARA PRIMARY KEY(sys_para_key);
		PRINT '	创建索引: PK_ST_SYS_PARA' 
	END 
GO  

PRINT '表: ST_SYSTEM' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_SYSTEM','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_SYSTEM ( 
			[database_key] varchar(20) NOT NULL,
			[system_key] varchar(3) NOT NULL,
			[system_name] varchar(20) NOT NULL,
			[system_package] varchar(30),
			[system_text] varchar(20) NOT NULL,
			[system_version] int DEFAULT((0)) NOT NULL,
			[system_hide] int DEFAULT((0)) NOT NULL,
			[system_order] int DEFAULT((999)) NOT NULL,
			[system_remark] varchar(200),
			[creator] varchar(20) NOT NULL,
			[cdate] datetime NOT NULL,
			[modifier] varchar(20),
			[mdate] datetime
		) 
		PRINT '	创建表: ST_SYSTEM' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_SYSTEM','U') AND name = 'database_key') 
	BEGIN 
		ALTER TABLE ST_SYSTEM ADD [database_key] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_SYSTEM.database_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_SYSTEM','U') AND name = 'system_key') 
	BEGIN 
		ALTER TABLE ST_SYSTEM ADD [system_key] varchar(3) NOT NULL 
		PRINT '	创建字段: ST_SYSTEM.system_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_SYSTEM','U') AND name = 'system_name') 
	BEGIN 
		ALTER TABLE ST_SYSTEM ADD [system_name] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_SYSTEM.system_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_SYSTEM','U') AND name = 'system_package') 
	BEGIN 
		ALTER TABLE ST_SYSTEM ADD [system_package] varchar(30) 
		PRINT '	创建字段: ST_SYSTEM.system_package' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_SYSTEM','U') AND name = 'system_text') 
	BEGIN 
		ALTER TABLE ST_SYSTEM ADD [system_text] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_SYSTEM.system_text' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_SYSTEM','U') AND name = 'system_version') 
	BEGIN 
		ALTER TABLE ST_SYSTEM ADD [system_version] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_SYSTEM.system_version' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_SYSTEM','U') AND name = 'system_hide') 
	BEGIN 
		ALTER TABLE ST_SYSTEM ADD [system_hide] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_SYSTEM.system_hide' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_SYSTEM','U') AND name = 'system_order') 
	BEGIN 
		ALTER TABLE ST_SYSTEM ADD [system_order] int DEFAULT((999)) NOT NULL 
		PRINT '	创建字段: ST_SYSTEM.system_order' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_SYSTEM','U') AND name = 'system_remark') 
	BEGIN 
		ALTER TABLE ST_SYSTEM ADD [system_remark] varchar(200) 
		PRINT '	创建字段: ST_SYSTEM.system_remark' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_SYSTEM','U') AND name = 'creator') 
	BEGIN 
		ALTER TABLE ST_SYSTEM ADD [creator] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_SYSTEM.creator' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_SYSTEM','U') AND name = 'cdate') 
	BEGIN 
		ALTER TABLE ST_SYSTEM ADD [cdate] datetime NOT NULL 
		PRINT '	创建字段: ST_SYSTEM.cdate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_SYSTEM','U') AND name = 'modifier') 
	BEGIN 
		ALTER TABLE ST_SYSTEM ADD [modifier] varchar(20) 
		PRINT '	创建字段: ST_SYSTEM.modifier' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_SYSTEM','U') AND name = 'mdate') 
	BEGIN 
		ALTER TABLE ST_SYSTEM ADD [mdate] datetime 
		PRINT '	创建字段: ST_SYSTEM.mdate' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_SYSTEM') AND c.name = 'database_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '默认数据库|逻辑数据库名称','USER', 'dbo', 'TABLE', 'ST_SYSTEM', 'COLUMN', 'database_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '默认数据库|逻辑数据库名称','USER', 'dbo', 'TABLE', 'ST_SYSTEM', 'COLUMN', 'database_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_SYSTEM') AND c.name = 'system_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '子系统key值|多客户用多个系统库进行区分','USER', 'dbo', 'TABLE', 'ST_SYSTEM', 'COLUMN', 'system_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '子系统key值|多客户用多个系统库进行区分','USER', 'dbo', 'TABLE', 'ST_SYSTEM', 'COLUMN', 'system_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_SYSTEM') AND c.name = 'system_name')
	EXEC sys.sp_addextendedproperty 'MS_Description', '子系统名称|前台子系统根目录','USER', 'dbo', 'TABLE', 'ST_SYSTEM', 'COLUMN', 'system_name'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '子系统名称|前台子系统根目录','USER', 'dbo', 'TABLE', 'ST_SYSTEM', 'COLUMN', 'system_name'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_SYSTEM') AND c.name = 'system_package')
	EXEC sys.sp_addextendedproperty 'MS_Description', '子系统类包|后台子系统根目录，默认值同system_name','USER', 'dbo', 'TABLE', 'ST_SYSTEM', 'COLUMN', 'system_package'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '子系统类包|后台子系统根目录，默认值同system_name','USER', 'dbo', 'TABLE', 'ST_SYSTEM', 'COLUMN', 'system_package'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_SYSTEM') AND c.name = 'system_text')
	EXEC sys.sp_addextendedproperty 'MS_Description', '系统简称|子系统标签显示的名称','USER', 'dbo', 'TABLE', 'ST_SYSTEM', 'COLUMN', 'system_text'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '系统简称|子系统标签显示的名称','USER', 'dbo', 'TABLE', 'ST_SYSTEM', 'COLUMN', 'system_text'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_SYSTEM') AND c.name = 'system_version')
	EXEC sys.sp_addextendedproperty 'MS_Description', '子系统版本','USER', 'dbo', 'TABLE', 'ST_SYSTEM', 'COLUMN', 'system_version'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '子系统版本','USER', 'dbo', 'TABLE', 'ST_SYSTEM', 'COLUMN', 'system_version'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_SYSTEM') AND c.name = 'system_hide')
	EXEC sys.sp_addextendedproperty 'MS_Description', '是否隐藏|0：显示，1：隐藏','USER', 'dbo', 'TABLE', 'ST_SYSTEM', 'COLUMN', 'system_hide'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '是否隐藏|0：显示，1：隐藏','USER', 'dbo', 'TABLE', 'ST_SYSTEM', 'COLUMN', 'system_hide'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_SYSTEM') AND c.name = 'system_order')
	EXEC sys.sp_addextendedproperty 'MS_Description', '系统排列顺序','USER', 'dbo', 'TABLE', 'ST_SYSTEM', 'COLUMN', 'system_order'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '系统排列顺序','USER', 'dbo', 'TABLE', 'ST_SYSTEM', 'COLUMN', 'system_order' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_SYSTEM') AND name = 'PK_ST_SYSTEM') 
	BEGIN 
		ALTER TABLE ST_SYSTEM ADD CONSTRAINT PK_ST_SYSTEM PRIMARY KEY(system_key);
		PRINT '	创建索引: PK_ST_SYSTEM' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_SYSTEM') AND name = 'IX_ST_SYSTEM_name') 
	BEGIN 
		CREATE UNIQUE INDEX IX_ST_SYSTEM_name on ST_SYSTEM(system_name);
		PRINT '	创建索引: IX_ST_SYSTEM_name' 
	END 
GO  

PRINT '表: ST_TABLE' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_TABLE','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_TABLE ( 
			[database_key] varchar(20) NOT NULL,
			[table_key] varchar(52) NOT NULL,
			[table_name] varchar(30) NOT NULL,
			[table_type] varchar(1) DEFAULT('U'),
			[table_text] varchar(30),
			[table_version] datetime DEFAULT((getdate())),
			[table_remark] varchar(200),
			[creator] varchar(20),
			[cdate] datetime,
			[modifier] varchar(20),
			[mdate] datetime
		) 
		PRINT '	创建表: ST_TABLE' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TABLE','U') AND name = 'database_key') 
	BEGIN 
		ALTER TABLE ST_TABLE ADD [database_key] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_TABLE.database_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TABLE','U') AND name = 'table_key') 
	BEGIN 
		ALTER TABLE ST_TABLE ADD [table_key] varchar(52) NOT NULL 
		PRINT '	创建字段: ST_TABLE.table_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TABLE','U') AND name = 'table_name') 
	BEGIN 
		ALTER TABLE ST_TABLE ADD [table_name] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_TABLE.table_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TABLE','U') AND name = 'table_type') 
	BEGIN 
		ALTER TABLE ST_TABLE ADD [table_type] varchar(1) DEFAULT('U') 
		PRINT '	创建字段: ST_TABLE.table_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TABLE','U') AND name = 'table_text') 
	BEGIN 
		ALTER TABLE ST_TABLE ADD [table_text] varchar(30) 
		PRINT '	创建字段: ST_TABLE.table_text' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TABLE','U') AND name = 'table_version') 
	BEGIN 
		ALTER TABLE ST_TABLE ADD [table_version] datetime DEFAULT((getdate())) 
		PRINT '	创建字段: ST_TABLE.table_version' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TABLE','U') AND name = 'table_remark') 
	BEGIN 
		ALTER TABLE ST_TABLE ADD [table_remark] varchar(200) 
		PRINT '	创建字段: ST_TABLE.table_remark' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TABLE','U') AND name = 'creator') 
	BEGIN 
		ALTER TABLE ST_TABLE ADD [creator] varchar(20) 
		PRINT '	创建字段: ST_TABLE.creator' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TABLE','U') AND name = 'cdate') 
	BEGIN 
		ALTER TABLE ST_TABLE ADD [cdate] datetime 
		PRINT '	创建字段: ST_TABLE.cdate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TABLE','U') AND name = 'modifier') 
	BEGIN 
		ALTER TABLE ST_TABLE ADD [modifier] varchar(20) 
		PRINT '	创建字段: ST_TABLE.modifier' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TABLE','U') AND name = 'mdate') 
	BEGIN 
		ALTER TABLE ST_TABLE ADD [mdate] datetime 
		PRINT '	创建字段: ST_TABLE.mdate' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_TABLE') AND c.name = 'table_name')
	EXEC sys.sp_addextendedproperty 'MS_Description', '对象物理名称','USER', 'dbo', 'TABLE', 'ST_TABLE', 'COLUMN', 'table_name'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '对象物理名称','USER', 'dbo', 'TABLE', 'ST_TABLE', 'COLUMN', 'table_name'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_TABLE') AND c.name = 'table_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '对象类型|U：表，V：视图','USER', 'dbo', 'TABLE', 'ST_TABLE', 'COLUMN', 'table_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '对象类型|U：表，V：视图','USER', 'dbo', 'TABLE', 'ST_TABLE', 'COLUMN', 'table_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_TABLE') AND c.name = 'table_text')
	EXEC sys.sp_addextendedproperty 'MS_Description', '对象中文名称','USER', 'dbo', 'TABLE', 'ST_TABLE', 'COLUMN', 'table_text'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '对象中文名称','USER', 'dbo', 'TABLE', 'ST_TABLE', 'COLUMN', 'table_text'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_TABLE') AND c.name = 'table_version')
	EXEC sys.sp_addextendedproperty 'MS_Description', '版本号|默认数据库记录创建时间，可以手工修改','USER', 'dbo', 'TABLE', 'ST_TABLE', 'COLUMN', 'table_version'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '版本号|默认数据库记录创建时间，可以手工修改','USER', 'dbo', 'TABLE', 'ST_TABLE', 'COLUMN', 'table_version' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_TABLE') AND name = 'PK_ST_TABLE') 
	BEGIN 
		ALTER TABLE ST_TABLE ADD CONSTRAINT PK_ST_TABLE PRIMARY KEY(table_key);
		PRINT '	创建索引: PK_ST_TABLE' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_TABLE') AND name = 'FK_ST_TABLE') 
	BEGIN 
		CREATE INDEX FK_ST_TABLE on ST_TABLE(database_key);
		PRINT '	创建索引: FK_ST_TABLE' 
	END 
GO  

PRINT '表: ST_TREE' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_TREE','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_TREE ( 
			[database_key] varchar(20) NOT NULL,
			[tree_key] varchar(30) NOT NULL,
			[tree_name] varchar(30) NOT NULL,
			[tree_root_where] varchar(256),
			[tree_first_node_value] varchar(30),
			[tree_auto_expand] int DEFAULT((0)) NOT NULL,
			[tree_remark] varchar(200),
			[creator] varchar(20),
			[cdate] datetime,
			[modifier] varchar(20),
			[mdate] datetime
		) 
		PRINT '	创建表: ST_TREE' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TREE','U') AND name = 'database_key') 
	BEGIN 
		ALTER TABLE ST_TREE ADD [database_key] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_TREE.database_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TREE','U') AND name = 'tree_key') 
	BEGIN 
		ALTER TABLE ST_TREE ADD [tree_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_TREE.tree_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TREE','U') AND name = 'tree_name') 
	BEGIN 
		ALTER TABLE ST_TREE ADD [tree_name] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_TREE.tree_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TREE','U') AND name = 'tree_root_where') 
	BEGIN 
		ALTER TABLE ST_TREE ADD [tree_root_where] varchar(256) 
		PRINT '	创建字段: ST_TREE.tree_root_where' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TREE','U') AND name = 'tree_first_node_value') 
	BEGIN 
		ALTER TABLE ST_TREE ADD [tree_first_node_value] varchar(30) 
		PRINT '	创建字段: ST_TREE.tree_first_node_value' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TREE','U') AND name = 'tree_auto_expand') 
	BEGIN 
		ALTER TABLE ST_TREE ADD [tree_auto_expand] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_TREE.tree_auto_expand' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TREE','U') AND name = 'tree_remark') 
	BEGIN 
		ALTER TABLE ST_TREE ADD [tree_remark] varchar(200) 
		PRINT '	创建字段: ST_TREE.tree_remark' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TREE','U') AND name = 'creator') 
	BEGIN 
		ALTER TABLE ST_TREE ADD [creator] varchar(20) 
		PRINT '	创建字段: ST_TREE.creator' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TREE','U') AND name = 'cdate') 
	BEGIN 
		ALTER TABLE ST_TREE ADD [cdate] datetime 
		PRINT '	创建字段: ST_TREE.cdate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TREE','U') AND name = 'modifier') 
	BEGIN 
		ALTER TABLE ST_TREE ADD [modifier] varchar(20) 
		PRINT '	创建字段: ST_TREE.modifier' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TREE','U') AND name = 'mdate') 
	BEGIN 
		ALTER TABLE ST_TREE ADD [mdate] datetime 
		PRINT '	创建字段: ST_TREE.mdate' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_TREE') AND c.name = 'tree_name')
	EXEC sys.sp_addextendedproperty 'MS_Description', '树名称','USER', 'dbo', 'TABLE', 'ST_TREE', 'COLUMN', 'tree_name'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '树名称','USER', 'dbo', 'TABLE', 'ST_TREE', 'COLUMN', 'tree_name'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_TREE') AND c.name = 'tree_root_where')
	EXEC sys.sp_addextendedproperty 'MS_Description', '根节点时的视图条件|一般为空，即显示全部数据，也可以设置为不显示任何数据','USER', 'dbo', 'TABLE', 'ST_TREE', 'COLUMN', 'tree_root_where'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '根节点时的视图条件|一般为空，即显示全部数据，也可以设置为不显示任何数据','USER', 'dbo', 'TABLE', 'ST_TREE', 'COLUMN', 'tree_root_where'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_TREE') AND c.name = 'tree_first_node_value')
	EXEC sys.sp_addextendedproperty 'MS_Description', '根节点条件|例如：机构树为循环节点，首节点为当前用户所在机构。','USER', 'dbo', 'TABLE', 'ST_TREE', 'COLUMN', 'tree_first_node_value'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '根节点条件|例如：机构树为循环节点，首节点为当前用户所在机构。','USER', 'dbo', 'TABLE', 'ST_TREE', 'COLUMN', 'tree_first_node_value'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_TREE') AND c.name = 'tree_auto_expand')
	EXEC sys.sp_addextendedproperty 'MS_Description', '是否自动展开第一级','USER', 'dbo', 'TABLE', 'ST_TREE', 'COLUMN', 'tree_auto_expand'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '是否自动展开第一级','USER', 'dbo', 'TABLE', 'ST_TREE', 'COLUMN', 'tree_auto_expand' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_TREE') AND name = 'PK_ST_TREE') 
	BEGIN 
		ALTER TABLE ST_TREE ADD CONSTRAINT PK_ST_TREE PRIMARY KEY(tree_key);
		PRINT '	创建索引: PK_ST_TREE' 
	END 
GO  

PRINT '表: ST_TREE_NODE' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_TREE_NODE','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_TREE_NODE ( 
			[tree_key] varchar(30) NOT NULL,
			[tree_node_level] int NOT NULL,
			[single_condition] int DEFAULT((0)) NOT NULL,
			[tree_node_field_type] varchar(5) DEFAULT('field'),
			[tree_node_field] varchar(1024),
			[tree_node_sql] varchar(1024) NOT NULL,
			[tree_node_remark] varchar(200)
		) 
		PRINT '	创建表: ST_TREE_NODE' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TREE_NODE','U') AND name = 'tree_key') 
	BEGIN 
		ALTER TABLE ST_TREE_NODE ADD [tree_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_TREE_NODE.tree_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TREE_NODE','U') AND name = 'tree_node_level') 
	BEGIN 
		ALTER TABLE ST_TREE_NODE ADD [tree_node_level] int NOT NULL 
		PRINT '	创建字段: ST_TREE_NODE.tree_node_level' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TREE_NODE','U') AND name = 'single_condition') 
	BEGIN 
		ALTER TABLE ST_TREE_NODE ADD [single_condition] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_TREE_NODE.single_condition' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TREE_NODE','U') AND name = 'tree_node_field_type') 
	BEGIN 
		ALTER TABLE ST_TREE_NODE ADD [tree_node_field_type] varchar(5) DEFAULT('field') 
		PRINT '	创建字段: ST_TREE_NODE.tree_node_field_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TREE_NODE','U') AND name = 'tree_node_field') 
	BEGIN 
		ALTER TABLE ST_TREE_NODE ADD [tree_node_field] varchar(1024) 
		PRINT '	创建字段: ST_TREE_NODE.tree_node_field' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TREE_NODE','U') AND name = 'tree_node_sql') 
	BEGIN 
		ALTER TABLE ST_TREE_NODE ADD [tree_node_sql] varchar(1024) NOT NULL 
		PRINT '	创建字段: ST_TREE_NODE.tree_node_sql' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_TREE_NODE','U') AND name = 'tree_node_remark') 
	BEGIN 
		ALTER TABLE ST_TREE_NODE ADD [tree_node_remark] varchar(200) 
		PRINT '	创建字段: ST_TREE_NODE.tree_node_remark' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_TREE_NODE') AND c.name = 'tree_node_level')
	EXEC sys.sp_addextendedproperty 'MS_Description', '树节点层级','USER', 'dbo', 'TABLE', 'ST_TREE_NODE', 'COLUMN', 'tree_node_level'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '树节点层级','USER', 'dbo', 'TABLE', 'ST_TREE_NODE', 'COLUMN', 'tree_node_level'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_TREE_NODE') AND c.name = 'single_condition')
	EXEC sys.sp_addextendedproperty 'MS_Description', '单一条件|导航条件是否为单一条件，默认为0：合并父节点条件，1：单一节点条件','USER', 'dbo', 'TABLE', 'ST_TREE_NODE', 'COLUMN', 'single_condition'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '单一条件|导航条件是否为单一条件，默认为0：合并父节点条件，1：单一节点条件','USER', 'dbo', 'TABLE', 'ST_TREE_NODE', 'COLUMN', 'single_condition'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_TREE_NODE') AND c.name = 'tree_node_field_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '导航字段类型|field：字段，sql：sql语句','USER', 'dbo', 'TABLE', 'ST_TREE_NODE', 'COLUMN', 'tree_node_field_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '导航字段类型|field：字段，sql：sql语句','USER', 'dbo', 'TABLE', 'ST_TREE_NODE', 'COLUMN', 'tree_node_field_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_TREE_NODE') AND c.name = 'tree_node_field')
	EXEC sys.sp_addextendedproperty 'MS_Description', '本级节点导航条件|字段或SQL语句，%v%表示当前节点的值(node_value)','USER', 'dbo', 'TABLE', 'ST_TREE_NODE', 'COLUMN', 'tree_node_field'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '本级节点导航条件|字段或SQL语句，%v%表示当前节点的值(node_value)','USER', 'dbo', 'TABLE', 'ST_TREE_NODE', 'COLUMN', 'tree_node_field'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_TREE_NODE') AND c.name = 'tree_node_sql')
	EXEC sys.sp_addextendedproperty 'MS_Description', '节点数据源|node_value, node_text, node_title, sub_nodes and others，前四项为固定列名，sub_nodes可省','USER', 'dbo', 'TABLE', 'ST_TREE_NODE', 'COLUMN', 'tree_node_sql'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '节点数据源|node_value, node_text, node_title, sub_nodes and others，前四项为固定列名，sub_nodes可省','USER', 'dbo', 'TABLE', 'ST_TREE_NODE', 'COLUMN', 'tree_node_sql'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_TREE_NODE') AND c.name = 'tree_node_remark')
	EXEC sys.sp_addextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_TREE_NODE', 'COLUMN', 'tree_node_remark'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_TREE_NODE', 'COLUMN', 'tree_node_remark' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_TREE_NODE') AND name = 'PK_ST_TREE_NODE') 
	BEGIN 
		ALTER TABLE ST_TREE_NODE ADD CONSTRAINT PK_ST_TREE_NODE PRIMARY KEY(tree_key,tree_node_level);
		PRINT '	创建索引: PK_ST_TREE_NODE' 
	END 
GO  

PRINT '表: ST_USER' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_USER','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_USER ( 
			[creator_office_id] int NOT NULL,
			[office_id] int NOT NULL,
			[user_key] varchar(30) NOT NULL,
			[user_key_md5] varchar(32),
			[user_name] varchar(20) NOT NULL,
			[user_password] varchar(32) NOT NULL,
			[user_type] int DEFAULT((1)) NOT NULL,
			[user_inactive] int DEFAULT((0)) NOT NULL,
			[user_account_manager] int DEFAULT((0)) NOT NULL,
			[user_privilege_manager] int DEFAULT((0)) NOT NULL,
			[user_id_card] varchar(18),
			[user_job_number] varchar(20),
			[user_mobile] varchar(20),
			[user_email] varchar(30),
			[user_remark] varchar(200),
			[creator] varchar(20),
			[cdate] datetime,
			[modifier] varchar(20),
			[mdate] datetime,
			[user_password1] varchar(28)
		) 
		PRINT '	创建表: ST_USER' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_USER','U') AND name = 'creator_office_id') 
	BEGIN 
		ALTER TABLE ST_USER ADD [creator_office_id] int NOT NULL 
		PRINT '	创建字段: ST_USER.creator_office_id' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_USER','U') AND name = 'office_id') 
	BEGIN 
		ALTER TABLE ST_USER ADD [office_id] int NOT NULL 
		PRINT '	创建字段: ST_USER.office_id' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_USER','U') AND name = 'user_key') 
	BEGIN 
		ALTER TABLE ST_USER ADD [user_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_USER.user_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_USER','U') AND name = 'user_key_md5') 
	BEGIN 
		ALTER TABLE ST_USER ADD [user_key_md5] varchar(32) 
		PRINT '	创建字段: ST_USER.user_key_md5' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_USER','U') AND name = 'user_name') 
	BEGIN 
		ALTER TABLE ST_USER ADD [user_name] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_USER.user_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_USER','U') AND name = 'user_password') 
	BEGIN 
		ALTER TABLE ST_USER ADD [user_password] varchar(32) NOT NULL 
		PRINT '	创建字段: ST_USER.user_password' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_USER','U') AND name = 'user_type') 
	BEGIN 
		ALTER TABLE ST_USER ADD [user_type] int DEFAULT((1)) NOT NULL 
		PRINT '	创建字段: ST_USER.user_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_USER','U') AND name = 'user_inactive') 
	BEGIN 
		ALTER TABLE ST_USER ADD [user_inactive] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_USER.user_inactive' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_USER','U') AND name = 'user_account_manager') 
	BEGIN 
		ALTER TABLE ST_USER ADD [user_account_manager] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_USER.user_account_manager' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_USER','U') AND name = 'user_privilege_manager') 
	BEGIN 
		ALTER TABLE ST_USER ADD [user_privilege_manager] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_USER.user_privilege_manager' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_USER','U') AND name = 'user_id_card') 
	BEGIN 
		ALTER TABLE ST_USER ADD [user_id_card] varchar(18) 
		PRINT '	创建字段: ST_USER.user_id_card' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_USER','U') AND name = 'user_job_number') 
	BEGIN 
		ALTER TABLE ST_USER ADD [user_job_number] varchar(20) 
		PRINT '	创建字段: ST_USER.user_job_number' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_USER','U') AND name = 'user_mobile') 
	BEGIN 
		ALTER TABLE ST_USER ADD [user_mobile] varchar(20) 
		PRINT '	创建字段: ST_USER.user_mobile' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_USER','U') AND name = 'user_email') 
	BEGIN 
		ALTER TABLE ST_USER ADD [user_email] varchar(30) 
		PRINT '	创建字段: ST_USER.user_email' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_USER','U') AND name = 'user_remark') 
	BEGIN 
		ALTER TABLE ST_USER ADD [user_remark] varchar(200) 
		PRINT '	创建字段: ST_USER.user_remark' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_USER','U') AND name = 'creator') 
	BEGIN 
		ALTER TABLE ST_USER ADD [creator] varchar(20) 
		PRINT '	创建字段: ST_USER.creator' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_USER','U') AND name = 'cdate') 
	BEGIN 
		ALTER TABLE ST_USER ADD [cdate] datetime 
		PRINT '	创建字段: ST_USER.cdate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_USER','U') AND name = 'modifier') 
	BEGIN 
		ALTER TABLE ST_USER ADD [modifier] varchar(20) 
		PRINT '	创建字段: ST_USER.modifier' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_USER','U') AND name = 'mdate') 
	BEGIN 
		ALTER TABLE ST_USER ADD [mdate] datetime 
		PRINT '	创建字段: ST_USER.mdate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_USER','U') AND name = 'user_password1') 
	BEGIN 
		ALTER TABLE ST_USER ADD [user_password1] varchar(28) 
		PRINT '	创建字段: ST_USER.user_password1' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_USER') AND c.name = 'creator_office_id')
	EXEC sys.sp_addextendedproperty 'MS_Description', '当前用户创建人机构ID|例如：上级用户为下级机构创建的管理员账户，下级机构修改该账户','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'creator_office_id'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '当前用户创建人机构ID|例如：上级用户为下级机构创建的管理员账户，下级机构修改该账户','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'creator_office_id'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_USER') AND c.name = 'office_id')
	EXEC sys.sp_addextendedproperty 'MS_Description', '用户所属机构ID','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'office_id'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '用户所属机构ID','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'office_id'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_USER') AND c.name = 'user_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '用户登录名称|初次登录后user_key不允许再修改，永久固定','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '用户登录名称|初次登录后user_key不允许再修改，永久固定','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_USER') AND c.name = 'user_name')
	EXEC sys.sp_addextendedproperty 'MS_Description', '用户姓名','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_name'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '用户姓名','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_name'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_USER') AND c.name = 'user_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '用户类型|-1:开发人员;0:系统内置用户,例如管理员; 1:用户自定义用户','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '用户类型|-1:开发人员;0:系统内置用户,例如管理员; 1:用户自定义用户','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_USER') AND c.name = 'user_inactive')
	EXEC sys.sp_addextendedproperty 'MS_Description', '是否禁用','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_inactive'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '是否禁用','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_inactive'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_USER') AND c.name = 'user_account_manager')
	EXEC sys.sp_addextendedproperty 'MS_Description', '账户管理员','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_account_manager'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '账户管理员','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_account_manager'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_USER') AND c.name = 'user_privilege_manager')
	EXEC sys.sp_addextendedproperty 'MS_Description', '权限管理员','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_privilege_manager'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '权限管理员','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_privilege_manager'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_USER') AND c.name = 'user_id_card')
	EXEC sys.sp_addextendedproperty 'MS_Description', '身份证号|身份证号码或护照号码等','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_id_card'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '身份证号|身份证号码或护照号码等','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_id_card'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_USER') AND c.name = 'user_job_number')
	EXEC sys.sp_addextendedproperty 'MS_Description', '工号|工作证号码','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_job_number'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '工号|工作证号码','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_job_number'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_USER') AND c.name = 'user_mobile')
	EXEC sys.sp_addextendedproperty 'MS_Description', '手机号码','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_mobile'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '手机号码','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_mobile'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_USER') AND c.name = 'user_email')
	EXEC sys.sp_addextendedproperty 'MS_Description', '电子邮箱','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_email'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '电子邮箱','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_email'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_USER') AND c.name = 'user_remark')
	EXEC sys.sp_addextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_remark'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_remark'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_USER') AND c.name = 'creator')
	EXEC sys.sp_addextendedproperty 'MS_Description', '创建日期','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'creator'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '创建日期','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'creator'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_USER') AND c.name = 'user_password1')
	EXEC sys.sp_addextendedproperty 'MS_Description', '动态密码','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_password1'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '动态密码','USER', 'dbo', 'TABLE', 'ST_USER', 'COLUMN', 'user_password1' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_USER') AND name = 'PK_ST_USER') 
	BEGIN 
		ALTER TABLE ST_USER ADD CONSTRAINT PK_ST_USER PRIMARY KEY(user_key);
		PRINT '	创建索引: PK_ST_USER' 
	END 
GO  

PRINT '表: ST_VIEW' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_VIEW','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_VIEW ( 
			[system_name] varchar(20) NOT NULL,
			[database_key] varchar(20) NOT NULL,
			[table_key] varchar(52) NOT NULL,
			[table_name] varchar(30),
			[view_key] varchar(30) NOT NULL,
			[view_name] varchar(40) NOT NULL,
			[view_sql_select] varchar(1024) NOT NULL,
			[view_sql_from] varchar(512) NOT NULL,
			[view_sql_where] varchar(512),
			[view_sql_groupby] varchar(256),
			[view_sql_orderby] varchar(128),
			[view_fixed_columns] int NOT NULL,
			[view_float_columns] int NOT NULL,
			[view_allow_addnew] int NOT NULL,
			[view_allow_modify] int,
			[view_allow_delete] int,
			[view_allow_copy] int DEFAULT((0)),
			[view_form_target] varchar(100),
			[view_fn_view] int DEFAULT((0)),
			[view_fn_view_name] varchar(20),
			[view_fn_delete] int DEFAULT((0)) NOT NULL,
			[view_fn_select] int DEFAULT((0)),
			[view_tree_width] numeric(12,2) DEFAULT((0.15)) NOT NULL,
			[view_backup_table] varchar(60),
			[view_prohibit_export] int DEFAULT((0)),
			[view_remark] varchar(200),
			[creator] varchar(30),
			[cdate] datetime,
			[modifier] varchar(30),
			[mdate] datetime
		) 
		PRINT '	创建表: ST_VIEW' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'system_name') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [system_name] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_VIEW.system_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'database_key') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [database_key] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_VIEW.database_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'table_key') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [table_key] varchar(52) NOT NULL 
		PRINT '	创建字段: ST_VIEW.table_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'table_name') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [table_name] varchar(30) 
		PRINT '	创建字段: ST_VIEW.table_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_key') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_VIEW.view_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_name') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_name] varchar(40) NOT NULL 
		PRINT '	创建字段: ST_VIEW.view_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_sql_select') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_sql_select] varchar(1024) NOT NULL 
		PRINT '	创建字段: ST_VIEW.view_sql_select' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_sql_from') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_sql_from] varchar(512) NOT NULL 
		PRINT '	创建字段: ST_VIEW.view_sql_from' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_sql_where') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_sql_where] varchar(512) 
		PRINT '	创建字段: ST_VIEW.view_sql_where' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_sql_groupby') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_sql_groupby] varchar(256) 
		PRINT '	创建字段: ST_VIEW.view_sql_groupby' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_sql_orderby') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_sql_orderby] varchar(128) 
		PRINT '	创建字段: ST_VIEW.view_sql_orderby' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_fixed_columns') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_fixed_columns] int NOT NULL 
		PRINT '	创建字段: ST_VIEW.view_fixed_columns' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_float_columns') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_float_columns] int NOT NULL 
		PRINT '	创建字段: ST_VIEW.view_float_columns' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_allow_addnew') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_allow_addnew] int NOT NULL 
		PRINT '	创建字段: ST_VIEW.view_allow_addnew' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_allow_modify') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_allow_modify] int 
		PRINT '	创建字段: ST_VIEW.view_allow_modify' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_allow_delete') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_allow_delete] int 
		PRINT '	创建字段: ST_VIEW.view_allow_delete' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_allow_copy') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_allow_copy] int DEFAULT((0)) 
		PRINT '	创建字段: ST_VIEW.view_allow_copy' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_form_target') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_form_target] varchar(100) 
		PRINT '	创建字段: ST_VIEW.view_form_target' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_fn_view') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_fn_view] int DEFAULT((0)) 
		PRINT '	创建字段: ST_VIEW.view_fn_view' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_fn_view_name') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_fn_view_name] varchar(20) 
		PRINT '	创建字段: ST_VIEW.view_fn_view_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_fn_delete') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_fn_delete] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_VIEW.view_fn_delete' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_fn_select') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_fn_select] int DEFAULT((0)) 
		PRINT '	创建字段: ST_VIEW.view_fn_select' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_tree_width') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_tree_width] numeric(12,2) DEFAULT((0.15)) NOT NULL 
		PRINT '	创建字段: ST_VIEW.view_tree_width' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_backup_table') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_backup_table] varchar(60) 
		PRINT '	创建字段: ST_VIEW.view_backup_table' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_prohibit_export') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_prohibit_export] int DEFAULT((0)) 
		PRINT '	创建字段: ST_VIEW.view_prohibit_export' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'view_remark') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [view_remark] varchar(200) 
		PRINT '	创建字段: ST_VIEW.view_remark' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'creator') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [creator] varchar(30) 
		PRINT '	创建字段: ST_VIEW.creator' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'cdate') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [cdate] datetime 
		PRINT '	创建字段: ST_VIEW.cdate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'modifier') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [modifier] varchar(30) 
		PRINT '	创建字段: ST_VIEW.modifier' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW','U') AND name = 'mdate') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD [mdate] datetime 
		PRINT '	创建字段: ST_VIEW.mdate' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW') AND c.name = 'view_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '视图KEY|建议系统库按照客户或产品分开，以保证视图KEY唯一','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '视图KEY|建议系统库按照客户或产品分开，以保证视图KEY唯一','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW') AND c.name = 'view_name')
	EXEC sys.sp_addextendedproperty 'MS_Description', '视图名称','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_name'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '视图名称','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_name'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW') AND c.name = 'view_sql_select')
	EXEC sys.sp_addextendedproperty 'MS_Description', 'SELECT 部分|不包括 SELECT 关键字','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_sql_select'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', 'SELECT 部分|不包括 SELECT 关键字','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_sql_select'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW') AND c.name = 'view_sql_from')
	EXEC sys.sp_addextendedproperty 'MS_Description', 'FROM部分|不包括 FROM 关键字','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_sql_from'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', 'FROM部分|不包括 FROM 关键字','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_sql_from'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW') AND c.name = 'view_sql_where')
	EXEC sys.sp_addextendedproperty 'MS_Description', 'WHERE部分|不包括 WHERE 关键字','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_sql_where'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', 'WHERE部分|不包括 WHERE 关键字','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_sql_where'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW') AND c.name = 'view_sql_groupby')
	EXEC sys.sp_addextendedproperty 'MS_Description', 'GROYP BY AND HAVING|不包括GROUP BY 关键字，但是包括HAVING关键字','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_sql_groupby'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', 'GROYP BY AND HAVING|不包括GROUP BY 关键字，但是包括HAVING关键字','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_sql_groupby'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW') AND c.name = 'view_sql_orderby')
	EXEC sys.sp_addextendedproperty 'MS_Description', 'ORDER BY部分|不包括 ORDER BY 关键字','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_sql_orderby'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', 'ORDER BY部分|不包括 ORDER BY 关键字','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_sql_orderby'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW') AND c.name = 'view_fixed_columns')
	EXEC sys.sp_addextendedproperty 'MS_Description', '固定列列数|总列数超出(固定列+浮动列)部分为隐藏列','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_fixed_columns'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '固定列列数|总列数超出(固定列+浮动列)部分为隐藏列','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_fixed_columns'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW') AND c.name = 'view_float_columns')
	EXEC sys.sp_addextendedproperty 'MS_Description', '浮动列列数|总列数超出(固定列+浮动列)部分为隐藏列','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_float_columns'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '浮动列列数|总列数超出(固定列+浮动列)部分为隐藏列','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_float_columns'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW') AND c.name = 'view_allow_addnew')
	EXEC sys.sp_addextendedproperty 'MS_Description', '允许添加||0：不允许；1：允许','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_allow_addnew'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '允许添加||0：不允许；1：允许','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_allow_addnew'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW') AND c.name = 'view_allow_modify')
	EXEC sys.sp_addextendedproperty 'MS_Description', '允许修改','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_allow_modify'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '允许修改','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_allow_modify'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW') AND c.name = 'view_allow_delete')
	EXEC sys.sp_addextendedproperty 'MS_Description', '允许删除||0：不允许；1：允许','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_allow_delete'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '允许删除||0：不允许；1：允许','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_allow_delete'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW') AND c.name = 'view_allow_copy')
	EXEC sys.sp_addextendedproperty 'MS_Description', '允许拷贝||0：不允许；1：允许','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_allow_copy'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '允许拷贝||0：不允许；1：允许','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_allow_copy'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW') AND c.name = 'view_form_target')
	EXEC sys.sp_addextendedproperty 'MS_Description', '视图实例类|视图对应的后台实例类','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_form_target'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '视图实例类|视图对应的后台实例类','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_form_target'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW') AND c.name = 'view_fn_view')
	EXEC sys.sp_addextendedproperty 'MS_Description', '是否添加查看列|0：不显示；1：显示','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_fn_view'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '是否添加查看列|0：不显示；1：显示','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_fn_view'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW') AND c.name = 'view_fn_view_name')
	EXEC sys.sp_addextendedproperty 'MS_Description', '编辑名称|编辑功能列的名称','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_fn_view_name'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '编辑名称|编辑功能列的名称','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_fn_view_name'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW') AND c.name = 'view_fn_delete')
	EXEC sys.sp_addextendedproperty 'MS_Description', '是否添加删除列|0：不显示；1：显示','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_fn_delete'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '是否添加删除列|0：不显示；1：显示','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_fn_delete'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW') AND c.name = 'view_fn_select')
	EXEC sys.sp_addextendedproperty 'MS_Description', '是否添加筛选列|0：不显示；1：单选；2：多选','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_fn_select'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '是否添加筛选列|0：不显示；1：单选；2：多选','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_fn_select'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW') AND c.name = 'view_tree_width')
	EXEC sys.sp_addextendedproperty 'MS_Description', '导航树默认宽度|大于1为实际宽度，小于1为百分比','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_tree_width'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '导航树默认宽度|大于1为实际宽度，小于1为百分比','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_tree_width'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW') AND c.name = 'view_backup_table')
	EXEC sys.sp_addextendedproperty 'MS_Description', '自动备份表','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_backup_table'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '自动备份表','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_backup_table'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW') AND c.name = 'view_prohibit_export')
	EXEC sys.sp_addextendedproperty 'MS_Description', '禁止导出|禁止数据导出','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_prohibit_export'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '禁止导出|禁止数据导出','USER', 'dbo', 'TABLE', 'ST_VIEW', 'COLUMN', 'view_prohibit_export' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_VIEW') AND name = 'PK_ST_VIEW') 
	BEGIN 
		ALTER TABLE ST_VIEW ADD CONSTRAINT PK_ST_VIEW PRIMARY KEY(view_key);
		PRINT '	创建索引: PK_ST_VIEW' 
	END 
GO  

PRINT '表: ST_VIEW_' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_VIEW_','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_VIEW_ ( 
			[user_key] varchar(20) NOT NULL,
			[view_key] varchar(30) NOT NULL,
			[view_sql_select] varchar(1024) NOT NULL,
			[view_fixed_columns] int,
			[view_float_columns] int
		) 
		PRINT '	创建表: ST_VIEW_' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_','U') AND name = 'user_key') 
	BEGIN 
		ALTER TABLE ST_VIEW_ ADD [user_key] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_VIEW_.user_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_','U') AND name = 'view_key') 
	BEGIN 
		ALTER TABLE ST_VIEW_ ADD [view_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_VIEW_.view_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_','U') AND name = 'view_sql_select') 
	BEGIN 
		ALTER TABLE ST_VIEW_ ADD [view_sql_select] varchar(1024) NOT NULL 
		PRINT '	创建字段: ST_VIEW_.view_sql_select' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_','U') AND name = 'view_fixed_columns') 
	BEGIN 
		ALTER TABLE ST_VIEW_ ADD [view_fixed_columns] int 
		PRINT '	创建字段: ST_VIEW_.view_fixed_columns' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_','U') AND name = 'view_float_columns') 
	BEGIN 
		ALTER TABLE ST_VIEW_ ADD [view_float_columns] int 
		PRINT '	创建字段: ST_VIEW_.view_float_columns' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_') AND c.name = 'view_sql_select')
	EXEC sys.sp_addextendedproperty 'MS_Description', 'SELECT 部分|不包括 SELECT 关键字','USER', 'dbo', 'TABLE', 'ST_VIEW_', 'COLUMN', 'view_sql_select'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', 'SELECT 部分|不包括 SELECT 关键字','USER', 'dbo', 'TABLE', 'ST_VIEW_', 'COLUMN', 'view_sql_select' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_VIEW_') AND name = 'PK_ST_VIEW_') 
	BEGIN 
		ALTER TABLE ST_VIEW_ ADD CONSTRAINT PK_ST_VIEW_ PRIMARY KEY(user_key,view_key);
		PRINT '	创建索引: PK_ST_VIEW_' 
	END 
GO  

PRINT '表: ST_VIEW_EXTRA' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_VIEW_EXTRA','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_VIEW_EXTRA ( 
			[view_key] varchar(30) NOT NULL,
			[menu_key] varchar(30) DEFAULT('*') NOT NULL,
			[view_extra_key] varchar(30) NOT NULL,
			[view_extra_text] varchar(30) NOT NULL,
			[view_extra_type] varchar(5) NOT NULL,
			[view_extra_width] int DEFAULT((0)) NOT NULL,
			[view_extra_inactive] int DEFAULT((0)) NOT NULL,
			[view_extra_remark] varchar(200),
			[view_extra_order] int DEFAULT((999)),
			[view_extra_form_url] varchar(100)
		) 
		PRINT '	创建表: ST_VIEW_EXTRA' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_EXTRA','U') AND name = 'view_key') 
	BEGIN 
		ALTER TABLE ST_VIEW_EXTRA ADD [view_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_VIEW_EXTRA.view_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_EXTRA','U') AND name = 'menu_key') 
	BEGIN 
		ALTER TABLE ST_VIEW_EXTRA ADD [menu_key] varchar(30) DEFAULT('*') NOT NULL 
		PRINT '	创建字段: ST_VIEW_EXTRA.menu_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_EXTRA','U') AND name = 'view_extra_key') 
	BEGIN 
		ALTER TABLE ST_VIEW_EXTRA ADD [view_extra_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_VIEW_EXTRA.view_extra_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_EXTRA','U') AND name = 'view_extra_text') 
	BEGIN 
		ALTER TABLE ST_VIEW_EXTRA ADD [view_extra_text] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_VIEW_EXTRA.view_extra_text' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_EXTRA','U') AND name = 'view_extra_type') 
	BEGIN 
		ALTER TABLE ST_VIEW_EXTRA ADD [view_extra_type] varchar(5) NOT NULL 
		PRINT '	创建字段: ST_VIEW_EXTRA.view_extra_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_EXTRA','U') AND name = 'view_extra_width') 
	BEGIN 
		ALTER TABLE ST_VIEW_EXTRA ADD [view_extra_width] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_VIEW_EXTRA.view_extra_width' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_EXTRA','U') AND name = 'view_extra_inactive') 
	BEGIN 
		ALTER TABLE ST_VIEW_EXTRA ADD [view_extra_inactive] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_VIEW_EXTRA.view_extra_inactive' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_EXTRA','U') AND name = 'view_extra_remark') 
	BEGIN 
		ALTER TABLE ST_VIEW_EXTRA ADD [view_extra_remark] varchar(200) 
		PRINT '	创建字段: ST_VIEW_EXTRA.view_extra_remark' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_EXTRA','U') AND name = 'view_extra_order') 
	BEGIN 
		ALTER TABLE ST_VIEW_EXTRA ADD [view_extra_order] int DEFAULT((999)) 
		PRINT '	创建字段: ST_VIEW_EXTRA.view_extra_order' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_EXTRA','U') AND name = 'view_extra_form_url') 
	BEGIN 
		ALTER TABLE ST_VIEW_EXTRA ADD [view_extra_form_url] varchar(100) 
		PRINT '	创建字段: ST_VIEW_EXTRA.view_extra_form_url' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_EXTRA') AND c.name = 'menu_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '菜单标识|默认为*,表示为与调用菜单无关','USER', 'dbo', 'TABLE', 'ST_VIEW_EXTRA', 'COLUMN', 'menu_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '菜单标识|默认为*,表示为与调用菜单无关','USER', 'dbo', 'TABLE', 'ST_VIEW_EXTRA', 'COLUMN', 'menu_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_EXTRA') AND c.name = 'view_extra_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '扩展功能标识','USER', 'dbo', 'TABLE', 'ST_VIEW_EXTRA', 'COLUMN', 'view_extra_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '扩展功能标识','USER', 'dbo', 'TABLE', 'ST_VIEW_EXTRA', 'COLUMN', 'view_extra_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_EXTRA') AND c.name = 'view_extra_text')
	EXEC sys.sp_addextendedproperty 'MS_Description', '扩展功能名称','USER', 'dbo', 'TABLE', 'ST_VIEW_EXTRA', 'COLUMN', 'view_extra_text'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '扩展功能名称','USER', 'dbo', 'TABLE', 'ST_VIEW_EXTRA', 'COLUMN', 'view_extra_text'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_EXTRA') AND c.name = 'view_extra_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '扩展功能类型|1：视图按钮；2：视图网格功能列；3：界面按钮','USER', 'dbo', 'TABLE', 'ST_VIEW_EXTRA', 'COLUMN', 'view_extra_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '扩展功能类型|1：视图按钮；2：视图网格功能列；3：界面按钮','USER', 'dbo', 'TABLE', 'ST_VIEW_EXTRA', 'COLUMN', 'view_extra_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_EXTRA') AND c.name = 'view_extra_width')
	EXEC sys.sp_addextendedproperty 'MS_Description', '宽度|默认值为0，由系统自动根据文本内容计算出合适的宽度','USER', 'dbo', 'TABLE', 'ST_VIEW_EXTRA', 'COLUMN', 'view_extra_width'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '宽度|默认值为0，由系统自动根据文本内容计算出合适的宽度','USER', 'dbo', 'TABLE', 'ST_VIEW_EXTRA', 'COLUMN', 'view_extra_width'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_EXTRA') AND c.name = 'view_extra_inactive')
	EXEC sys.sp_addextendedproperty 'MS_Description', '禁用|默认为0','USER', 'dbo', 'TABLE', 'ST_VIEW_EXTRA', 'COLUMN', 'view_extra_inactive'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '禁用|默认为0','USER', 'dbo', 'TABLE', 'ST_VIEW_EXTRA', 'COLUMN', 'view_extra_inactive'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_EXTRA') AND c.name = 'view_extra_remark')
	EXEC sys.sp_addextendedproperty 'MS_Description', '扩展功能说明','USER', 'dbo', 'TABLE', 'ST_VIEW_EXTRA', 'COLUMN', 'view_extra_remark'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '扩展功能说明','USER', 'dbo', 'TABLE', 'ST_VIEW_EXTRA', 'COLUMN', 'view_extra_remark'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_EXTRA') AND c.name = 'view_extra_form_url')
	EXEC sys.sp_addextendedproperty 'MS_Description', '弹出窗口url','USER', 'dbo', 'TABLE', 'ST_VIEW_EXTRA', 'COLUMN', 'view_extra_form_url'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '弹出窗口url','USER', 'dbo', 'TABLE', 'ST_VIEW_EXTRA', 'COLUMN', 'view_extra_form_url' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_VIEW_EXTRA') AND name = 'PK_ST_VIEW_EXTRA') 
	BEGIN 
		ALTER TABLE ST_VIEW_EXTRA ADD CONSTRAINT PK_ST_VIEW_EXTRA PRIMARY KEY(menu_key,view_extra_key,view_key);
		PRINT '	创建索引: PK_ST_VIEW_EXTRA' 
	END 
GO  

PRINT '表: ST_VIEW_FIELD' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_VIEW_FIELD','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_VIEW_FIELD ( 
			[view_key] varchar(30) NOT NULL,
			[table_key] varchar(52),
			[field_key] varchar(82) NOT NULL,
			[field_name] varchar(30) NOT NULL,
			[field_prefix] varchar(30),
			[field_text] varchar(30),
			[field_title] varchar(50),
			[field_type] varchar(10) NOT NULL,
			[datatype] varchar(20) NOT NULL,
			[field_length] int,
			[field_pkey] int DEFAULT((0)) NOT NULL,
			[field_identity] int DEFAULT((0)) NOT NULL,
			[field_nullable] int DEFAULT((0)) NOT NULL,
			[field_updatable] int,
			[field_editable] int,
			[field_default] varchar(50),
			[field_grid_control] varchar(10),
			[field_grid_format] varchar(30),
			[field_align] varchar(10),
			[field_pixel_width] int,
			[field_input_format] varchar(30),
			[field_validation_key] varchar(30),
			[field_control_type] varchar(20),
			[field_query_type] varchar(10),
			[field_query_key] varchar(30),
			[field_query_source] varchar(500),
			[field_query_order] int DEFAULT((999)),
			[field_remark] varchar(200),
			[creator] varchar(20),
			[cdate] datetime,
			[modifier] varchar(20),
			[mdate] datetime,
			[field_css] varchar(30)
		) 
		PRINT '	创建表: ST_VIEW_FIELD' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'view_key') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [view_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_VIEW_FIELD.view_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'table_key') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [table_key] varchar(52) 
		PRINT '	创建字段: ST_VIEW_FIELD.table_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_key') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_key] varchar(82) NOT NULL 
		PRINT '	创建字段: ST_VIEW_FIELD.field_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_name') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_name] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_VIEW_FIELD.field_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_prefix') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_prefix] varchar(30) 
		PRINT '	创建字段: ST_VIEW_FIELD.field_prefix' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_text') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_text] varchar(30) 
		PRINT '	创建字段: ST_VIEW_FIELD.field_text' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_title') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_title] varchar(50) 
		PRINT '	创建字段: ST_VIEW_FIELD.field_title' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_type') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_type] varchar(10) NOT NULL 
		PRINT '	创建字段: ST_VIEW_FIELD.field_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'datatype') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [datatype] varchar(20) NOT NULL 
		PRINT '	创建字段: ST_VIEW_FIELD.datatype' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_length') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_length] int 
		PRINT '	创建字段: ST_VIEW_FIELD.field_length' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_pkey') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_pkey] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_VIEW_FIELD.field_pkey' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_identity') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_identity] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_VIEW_FIELD.field_identity' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_nullable') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_nullable] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: ST_VIEW_FIELD.field_nullable' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_updatable') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_updatable] int 
		PRINT '	创建字段: ST_VIEW_FIELD.field_updatable' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_editable') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_editable] int 
		PRINT '	创建字段: ST_VIEW_FIELD.field_editable' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_default') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_default] varchar(50) 
		PRINT '	创建字段: ST_VIEW_FIELD.field_default' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_grid_control') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_grid_control] varchar(10) 
		PRINT '	创建字段: ST_VIEW_FIELD.field_grid_control' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_grid_format') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_grid_format] varchar(30) 
		PRINT '	创建字段: ST_VIEW_FIELD.field_grid_format' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_align') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_align] varchar(10) 
		PRINT '	创建字段: ST_VIEW_FIELD.field_align' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_pixel_width') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_pixel_width] int 
		PRINT '	创建字段: ST_VIEW_FIELD.field_pixel_width' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_input_format') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_input_format] varchar(30) 
		PRINT '	创建字段: ST_VIEW_FIELD.field_input_format' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_validation_key') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_validation_key] varchar(30) 
		PRINT '	创建字段: ST_VIEW_FIELD.field_validation_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_control_type') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_control_type] varchar(20) 
		PRINT '	创建字段: ST_VIEW_FIELD.field_control_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_query_type') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_query_type] varchar(10) 
		PRINT '	创建字段: ST_VIEW_FIELD.field_query_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_query_key') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_query_key] varchar(30) 
		PRINT '	创建字段: ST_VIEW_FIELD.field_query_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_query_source') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_query_source] varchar(500) 
		PRINT '	创建字段: ST_VIEW_FIELD.field_query_source' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_query_order') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_query_order] int DEFAULT((999)) 
		PRINT '	创建字段: ST_VIEW_FIELD.field_query_order' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_remark') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_remark] varchar(200) 
		PRINT '	创建字段: ST_VIEW_FIELD.field_remark' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'creator') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [creator] varchar(20) 
		PRINT '	创建字段: ST_VIEW_FIELD.creator' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'cdate') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [cdate] datetime 
		PRINT '	创建字段: ST_VIEW_FIELD.cdate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'modifier') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [modifier] varchar(20) 
		PRINT '	创建字段: ST_VIEW_FIELD.modifier' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'mdate') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [mdate] datetime 
		PRINT '	创建字段: ST_VIEW_FIELD.mdate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_FIELD','U') AND name = 'field_css') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD [field_css] varchar(30) 
		PRINT '	创建字段: ST_VIEW_FIELD.field_css' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'table_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '外键,table.table_key','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'table_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '外键,table.table_key','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'table_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_name')
	EXEC sys.sp_addextendedproperty 'MS_Description', '字段名称','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_name'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '字段名称','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_name'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_prefix')
	EXEC sys.sp_addextendedproperty 'MS_Description', '查询前缀|多表关联时, 用于区分同名字段','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_prefix'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '查询前缀|多表关联时, 用于区分同名字段','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_prefix'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_text')
	EXEC sys.sp_addextendedproperty 'MS_Description', '字段中文名称','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_text'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '字段中文名称','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_text'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_title')
	EXEC sys.sp_addextendedproperty 'MS_Description', '字段提示|显示在界面上,供用户参考','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_title'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '字段提示|显示在界面上,供用户参考','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_title'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '精简数据类型|string、datetime、number','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '精简数据类型|string、datetime、number','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'datatype')
	EXEC sys.sp_addextendedproperty 'MS_Description', '物理字段类型|数据库中的实际数据类型，与数据库有关','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'datatype'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '物理字段类型|数据库中的实际数据类型，与数据库有关','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'datatype'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_length')
	EXEC sys.sp_addextendedproperty 'MS_Description', '字段长度,','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_length'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '字段长度,','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_length'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_pkey')
	EXEC sys.sp_addextendedproperty 'MS_Description', '是否主键字段','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_pkey'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '是否主键字段','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_pkey'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_identity')
	EXEC sys.sp_addextendedproperty 'MS_Description', '是否自增量字段','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_identity'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '是否自增量字段','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_identity'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_updatable')
	EXEC sys.sp_addextendedproperty 'MS_Description', '是否允许更新|例如计算列','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_updatable'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '是否允许更新|例如计算列','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_updatable'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_editable')
	EXEC sys.sp_addextendedproperty 'MS_Description', '允许手工编辑','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_editable'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '允许手工编辑','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_editable'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_default')
	EXEC sys.sp_addextendedproperty 'MS_Description', '默认值|新建记录时自动填充','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_default'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '默认值|新建记录时自动填充','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_default'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_grid_control')
	EXEC sys.sp_addextendedproperty 'MS_Description', '网格控件类型','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_grid_control'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '网格控件类型','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_grid_control'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_grid_format')
	EXEC sys.sp_addextendedproperty 'MS_Description', '网格界面格式','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_grid_format'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '网格界面格式','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_grid_format'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_align')
	EXEC sys.sp_addextendedproperty 'MS_Description', '对齐方向','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_align'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '对齐方向','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_align'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_pixel_width')
	EXEC sys.sp_addextendedproperty 'MS_Description', '网格宽度','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_pixel_width'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '网格宽度','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_pixel_width'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_input_format')
	EXEC sys.sp_addextendedproperty 'MS_Description', '输入界面格式','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_input_format'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '输入界面格式','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_input_format'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_validation_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', 'field_validation.key|字段值校验规则','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_validation_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', 'field_validation.key|字段值校验规则','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_validation_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_control_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '界面控件类型','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_control_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '界面控件类型','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_control_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_query_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '查询类型|文本输入、选择框、日期空间、下拉框、树、自定义窗口等','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_query_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '查询类型|文本输入、选择框、日期空间、下拉框、树、自定义窗口等','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_query_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_query_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', 'field_query.key','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_query_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', 'field_query.key','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_query_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_query_source')
	EXEC sys.sp_addextendedproperty 'MS_Description', '数据源字符串或SQL语句|如果是有query_key的情况，表示为条件语句','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_query_source'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '数据源字符串或SQL语句|如果是有query_key的情况，表示为条件语句','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_query_source'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_query_order')
	EXEC sys.sp_addextendedproperty 'MS_Description', '查询序号','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_query_order'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '查询序号','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_query_order'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_remark')
	EXEC sys.sp_addextendedproperty 'MS_Description', '字段说明|供程序员参考','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_remark'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '字段说明|供程序员参考','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_remark'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_FIELD') AND c.name = 'field_css')
	EXEC sys.sp_addextendedproperty 'MS_Description', '单元格CSS样式表','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_css'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '单元格CSS样式表','USER', 'dbo', 'TABLE', 'ST_VIEW_FIELD', 'COLUMN', 'field_css' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_VIEW_FIELD') AND name = 'PK_ST_VIEW_FIELD') 
	BEGIN 
		ALTER TABLE ST_VIEW_FIELD ADD CONSTRAINT PK_ST_VIEW_FIELD PRIMARY KEY(field_name,view_key);
		PRINT '	创建索引: PK_ST_VIEW_FIELD' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_VIEW_FIELD') AND name = 'IX_ST_VIEW_FIELD_view_key') 
	BEGIN 
		CREATE INDEX IX_ST_VIEW_FIELD_view_key on ST_VIEW_FIELD(view_key);
		PRINT '	创建索引: IX_ST_VIEW_FIELD_view_key' 
	END 
GO  

PRINT '表: ST_VIEW_TREE' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('ST_VIEW_TREE','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE ST_VIEW_TREE ( 
			[view_key] varchar(30) NOT NULL,
			[tree_key] varchar(30) NOT NULL,
			[vt_nav_type] varchar(20) DEFAULT('default') NOT NULL,
			[view_tree_order] int DEFAULT((999)) NOT NULL
		) 
		PRINT '	创建表: ST_VIEW_TREE' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_TREE','U') AND name = 'view_key') 
	BEGIN 
		ALTER TABLE ST_VIEW_TREE ADD [view_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_VIEW_TREE.view_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_TREE','U') AND name = 'tree_key') 
	BEGIN 
		ALTER TABLE ST_VIEW_TREE ADD [tree_key] varchar(30) NOT NULL 
		PRINT '	创建字段: ST_VIEW_TREE.tree_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_TREE','U') AND name = 'vt_nav_type') 
	BEGIN 
		ALTER TABLE ST_VIEW_TREE ADD [vt_nav_type] varchar(20) DEFAULT('default') NOT NULL 
		PRINT '	创建字段: ST_VIEW_TREE.vt_nav_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('ST_VIEW_TREE','U') AND name = 'view_tree_order') 
	BEGIN 
		ALTER TABLE ST_VIEW_TREE ADD [view_tree_order] int DEFAULT((999)) NOT NULL 
		PRINT '	创建字段: ST_VIEW_TREE.view_tree_order' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_TREE') AND c.name = 'vt_nav_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '导航类型|default：常规导航；script：脚本导航','USER', 'dbo', 'TABLE', 'ST_VIEW_TREE', 'COLUMN', 'vt_nav_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '导航类型|default：常规导航；script：脚本导航','USER', 'dbo', 'TABLE', 'ST_VIEW_TREE', 'COLUMN', 'vt_nav_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('ST_VIEW_TREE') AND c.name = 'view_tree_order')
	EXEC sys.sp_addextendedproperty 'MS_Description', '树序号','USER', 'dbo', 'TABLE', 'ST_VIEW_TREE', 'COLUMN', 'view_tree_order'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '树序号','USER', 'dbo', 'TABLE', 'ST_VIEW_TREE', 'COLUMN', 'view_tree_order' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ST_VIEW_TREE') AND name = 'PK_ST_VIEW_TREE') 
	BEGIN 
		ALTER TABLE ST_VIEW_TREE ADD CONSTRAINT PK_ST_VIEW_TREE PRIMARY KEY(tree_key,view_key);
		PRINT '	创建索引: PK_ST_VIEW_TREE' 
	END 
GO  

PRINT '表: WT_ALIPAY' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('WT_ALIPAY','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE WT_ALIPAY ( 
			[partner] varchar(16) NOT NULL,
			[seller_id] varchar(16) NOT NULL,
			[private_key] varchar(1024)
		) 
		PRINT '	创建表: WT_ALIPAY' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_ALIPAY','U') AND name = 'partner') 
	BEGIN 
		ALTER TABLE WT_ALIPAY ADD [partner] varchar(16) NOT NULL 
		PRINT '	创建字段: WT_ALIPAY.partner' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_ALIPAY','U') AND name = 'seller_id') 
	BEGIN 
		ALTER TABLE WT_ALIPAY ADD [seller_id] varchar(16) NOT NULL 
		PRINT '	创建字段: WT_ALIPAY.seller_id' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_ALIPAY','U') AND name = 'private_key') 
	BEGIN 
		ALTER TABLE WT_ALIPAY ADD [private_key] varchar(1024) 
		PRINT '	创建字段: WT_ALIPAY.private_key' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('WT_ALIPAY') AND c.name = 'partner')
	EXEC sys.sp_addextendedproperty 'MS_Description', '合作身份者ID，以2088开头由16位纯数字组成的字符串','USER', 'dbo', 'TABLE', 'WT_ALIPAY', 'COLUMN', 'partner'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '合作身份者ID，以2088开头由16位纯数字组成的字符串','USER', 'dbo', 'TABLE', 'WT_ALIPAY', 'COLUMN', 'partner'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('WT_ALIPAY') AND c.name = 'seller_id')
	EXEC sys.sp_addextendedproperty 'MS_Description', '收款支付宝账号，以2088开头由16位纯数字组成的字符串','USER', 'dbo', 'TABLE', 'WT_ALIPAY', 'COLUMN', 'seller_id'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '收款支付宝账号，以2088开头由16位纯数字组成的字符串','USER', 'dbo', 'TABLE', 'WT_ALIPAY', 'COLUMN', 'seller_id' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('WT_ALIPAY') AND name = 'PK_WT_ALIPAY') 
	BEGIN 
		ALTER TABLE WT_ALIPAY ADD CONSTRAINT PK_WT_ALIPAY PRIMARY KEY(partner);
		PRINT '	创建索引: PK_WT_ALIPAY' 
	END 
GO  

PRINT '表: WT_MENU' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('WT_MENU','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE WT_MENU ( 
			[service_key] varchar(20) NOT NULL,
			[menu_key_parent] varchar(20) DEFAULT('ROOT') NOT NULL,
			[menu_key] varchar(20) NOT NULL,
			[menu_name] varchar(20) NOT NULL,
			[menu_type] varchar(20) NOT NULL,
			[menu_need_oauth] int DEFAULT((0)) NOT NULL,
			[menu_inactive] int DEFAULT((0)),
			[menu_url] varchar(512),
			[menu_order] int DEFAULT((9)) NOT NULL,
			[menu_remark] varchar(100)
		) 
		PRINT '	创建表: WT_MENU' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_MENU','U') AND name = 'service_key') 
	BEGIN 
		ALTER TABLE WT_MENU ADD [service_key] varchar(20) NOT NULL 
		PRINT '	创建字段: WT_MENU.service_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_MENU','U') AND name = 'menu_key_parent') 
	BEGIN 
		ALTER TABLE WT_MENU ADD [menu_key_parent] varchar(20) DEFAULT('ROOT') NOT NULL 
		PRINT '	创建字段: WT_MENU.menu_key_parent' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_MENU','U') AND name = 'menu_key') 
	BEGIN 
		ALTER TABLE WT_MENU ADD [menu_key] varchar(20) NOT NULL 
		PRINT '	创建字段: WT_MENU.menu_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_MENU','U') AND name = 'menu_name') 
	BEGIN 
		ALTER TABLE WT_MENU ADD [menu_name] varchar(20) NOT NULL 
		PRINT '	创建字段: WT_MENU.menu_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_MENU','U') AND name = 'menu_type') 
	BEGIN 
		ALTER TABLE WT_MENU ADD [menu_type] varchar(20) NOT NULL 
		PRINT '	创建字段: WT_MENU.menu_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_MENU','U') AND name = 'menu_need_oauth') 
	BEGIN 
		ALTER TABLE WT_MENU ADD [menu_need_oauth] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: WT_MENU.menu_need_oauth' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_MENU','U') AND name = 'menu_inactive') 
	BEGIN 
		ALTER TABLE WT_MENU ADD [menu_inactive] int DEFAULT((0)) 
		PRINT '	创建字段: WT_MENU.menu_inactive' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_MENU','U') AND name = 'menu_url') 
	BEGIN 
		ALTER TABLE WT_MENU ADD [menu_url] varchar(512) 
		PRINT '	创建字段: WT_MENU.menu_url' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_MENU','U') AND name = 'menu_order') 
	BEGIN 
		ALTER TABLE WT_MENU ADD [menu_order] int DEFAULT((9)) NOT NULL 
		PRINT '	创建字段: WT_MENU.menu_order' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_MENU','U') AND name = 'menu_remark') 
	BEGIN 
		ALTER TABLE WT_MENU ADD [menu_remark] varchar(100) 
		PRINT '	创建字段: WT_MENU.menu_remark' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('WT_MENU') AND c.name = 'menu_inactive')
	EXEC sys.sp_addextendedproperty 'MS_Description', '是否禁用|1：禁用，0：启用','USER', 'dbo', 'TABLE', 'WT_MENU', 'COLUMN', 'menu_inactive'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '是否禁用|1：禁用，0：启用','USER', 'dbo', 'TABLE', 'WT_MENU', 'COLUMN', 'menu_inactive' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('WT_MENU') AND name = 'PK_WT_MENU') 
	BEGIN 
		ALTER TABLE WT_MENU ADD CONSTRAINT PK_WT_MENU PRIMARY KEY(menu_key,service_key);
		PRINT '	创建索引: PK_WT_MENU' 
	END 
GO  

PRINT '表: WT_SERVICE' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('WT_SERVICE','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE WT_SERVICE ( 
			[service_key] varchar(20) NOT NULL,
			[service_name] varchar(20),
			[app_id] varchar(20) NOT NULL,
			[app_secret] varchar(32) NOT NULL,
			[token] varchar(32),
			[merchant_id] varchar(12),
			[oauth_domain] varchar(50),
			[oauth_do] varchar(50),
			[transfer_url] varchar(50),
			[service_remark] varchar(200)
		) 
		PRINT '	创建表: WT_SERVICE' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_SERVICE','U') AND name = 'service_key') 
	BEGIN 
		ALTER TABLE WT_SERVICE ADD [service_key] varchar(20) NOT NULL 
		PRINT '	创建字段: WT_SERVICE.service_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_SERVICE','U') AND name = 'service_name') 
	BEGIN 
		ALTER TABLE WT_SERVICE ADD [service_name] varchar(20) 
		PRINT '	创建字段: WT_SERVICE.service_name' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_SERVICE','U') AND name = 'app_id') 
	BEGIN 
		ALTER TABLE WT_SERVICE ADD [app_id] varchar(20) NOT NULL 
		PRINT '	创建字段: WT_SERVICE.app_id' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_SERVICE','U') AND name = 'app_secret') 
	BEGIN 
		ALTER TABLE WT_SERVICE ADD [app_secret] varchar(32) NOT NULL 
		PRINT '	创建字段: WT_SERVICE.app_secret' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_SERVICE','U') AND name = 'token') 
	BEGIN 
		ALTER TABLE WT_SERVICE ADD [token] varchar(32) 
		PRINT '	创建字段: WT_SERVICE.token' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_SERVICE','U') AND name = 'merchant_id') 
	BEGIN 
		ALTER TABLE WT_SERVICE ADD [merchant_id] varchar(12) 
		PRINT '	创建字段: WT_SERVICE.merchant_id' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_SERVICE','U') AND name = 'oauth_domain') 
	BEGIN 
		ALTER TABLE WT_SERVICE ADD [oauth_domain] varchar(50) 
		PRINT '	创建字段: WT_SERVICE.oauth_domain' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_SERVICE','U') AND name = 'oauth_do') 
	BEGIN 
		ALTER TABLE WT_SERVICE ADD [oauth_do] varchar(50) 
		PRINT '	创建字段: WT_SERVICE.oauth_do' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_SERVICE','U') AND name = 'transfer_url') 
	BEGIN 
		ALTER TABLE WT_SERVICE ADD [transfer_url] varchar(50) 
		PRINT '	创建字段: WT_SERVICE.transfer_url' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('WT_SERVICE','U') AND name = 'service_remark') 
	BEGIN 
		ALTER TABLE WT_SERVICE ADD [service_remark] varchar(200) 
		PRINT '	创建字段: WT_SERVICE.service_remark' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('WT_SERVICE') AND c.name = 'merchant_id')
	EXEC sys.sp_addextendedproperty 'MS_Description', '商户号','USER', 'dbo', 'TABLE', 'WT_SERVICE', 'COLUMN', 'merchant_id'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '商户号','USER', 'dbo', 'TABLE', 'WT_SERVICE', 'COLUMN', 'merchant_id'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('WT_SERVICE') AND c.name = 'oauth_domain')
	EXEC sys.sp_addextendedproperty 'MS_Description', '网页授权回调域名','USER', 'dbo', 'TABLE', 'WT_SERVICE', 'COLUMN', 'oauth_domain'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '网页授权回调域名','USER', 'dbo', 'TABLE', 'WT_SERVICE', 'COLUMN', 'oauth_domain'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('WT_SERVICE') AND c.name = 'oauth_do')
	EXEC sys.sp_addextendedproperty 'MS_Description', '网页授权回调URL','USER', 'dbo', 'TABLE', 'WT_SERVICE', 'COLUMN', 'oauth_do'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '网页授权回调URL','USER', 'dbo', 'TABLE', 'WT_SERVICE', 'COLUMN', 'oauth_do'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('WT_SERVICE') AND c.name = 'transfer_url')
	EXEC sys.sp_addextendedproperty 'MS_Description', '中转页面','USER', 'dbo', 'TABLE', 'WT_SERVICE', 'COLUMN', 'transfer_url'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '中转页面','USER', 'dbo', 'TABLE', 'WT_SERVICE', 'COLUMN', 'transfer_url' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('WT_SERVICE') AND name = 'PK_WT_SERVICE') 
	BEGIN 
		ALTER TABLE WT_SERVICE ADD CONSTRAINT PK_WT_SERVICE PRIMARY KEY(service_key);
		PRINT '	创建索引: PK_WT_SERVICE' 
	END 
GO  

PRINT '表: XT_CDATA' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('XT_CDATA','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE XT_CDATA ( 
			[mdata_type] varchar(20) NOT NULL,
			[mdata_key] varchar(30) NOT NULL,
			[mdata_version] int DEFAULT((0)) NOT NULL,
			[mdata_status] int DEFAULT((0)) NOT NULL,
			[check_computer] varchar(20),
			[check_datetime] datetime
		) 
		PRINT '	创建表: XT_CDATA' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('XT_CDATA','U') AND name = 'mdata_type') 
	BEGIN 
		ALTER TABLE XT_CDATA ADD [mdata_type] varchar(20) NOT NULL 
		PRINT '	创建字段: XT_CDATA.mdata_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('XT_CDATA','U') AND name = 'mdata_key') 
	BEGIN 
		ALTER TABLE XT_CDATA ADD [mdata_key] varchar(30) NOT NULL 
		PRINT '	创建字段: XT_CDATA.mdata_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('XT_CDATA','U') AND name = 'mdata_version') 
	BEGIN 
		ALTER TABLE XT_CDATA ADD [mdata_version] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: XT_CDATA.mdata_version' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('XT_CDATA','U') AND name = 'mdata_status') 
	BEGIN 
		ALTER TABLE XT_CDATA ADD [mdata_status] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: XT_CDATA.mdata_status' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('XT_CDATA','U') AND name = 'check_computer') 
	BEGIN 
		ALTER TABLE XT_CDATA ADD [check_computer] varchar(20) 
		PRINT '	创建字段: XT_CDATA.check_computer' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('XT_CDATA','U') AND name = 'check_datetime') 
	BEGIN 
		ALTER TABLE XT_CDATA ADD [check_datetime] datetime 
		PRINT '	创建字段: XT_CDATA.check_datetime' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('XT_CDATA') AND c.name = 'mdata_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '主数据类型','USER', 'dbo', 'TABLE', 'XT_CDATA', 'COLUMN', 'mdata_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '主数据类型','USER', 'dbo', 'TABLE', 'XT_CDATA', 'COLUMN', 'mdata_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('XT_CDATA') AND c.name = 'mdata_key')
	EXEC sys.sp_addextendedproperty 'MS_Description', '主数据标识','USER', 'dbo', 'TABLE', 'XT_CDATA', 'COLUMN', 'mdata_key'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '主数据标识','USER', 'dbo', 'TABLE', 'XT_CDATA', 'COLUMN', 'mdata_key'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('XT_CDATA') AND c.name = 'mdata_version')
	EXEC sys.sp_addextendedproperty 'MS_Description', '主数据版本|默认值：0，表示原始版本','USER', 'dbo', 'TABLE', 'XT_CDATA', 'COLUMN', 'mdata_version'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '主数据版本|默认值：0，表示原始版本','USER', 'dbo', 'TABLE', 'XT_CDATA', 'COLUMN', 'mdata_version'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('XT_CDATA') AND c.name = 'mdata_status')
	EXEC sys.sp_addextendedproperty 'MS_Description', '主数据状态|0：默认值，签入状态；1：签出状态','USER', 'dbo', 'TABLE', 'XT_CDATA', 'COLUMN', 'mdata_status'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '主数据状态|0：默认值，签入状态；1：签出状态','USER', 'dbo', 'TABLE', 'XT_CDATA', 'COLUMN', 'mdata_status'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('XT_CDATA') AND c.name = 'check_computer')
	EXEC sys.sp_addextendedproperty 'MS_Description', '工作站|签出工作站（或末次签入工作站）','USER', 'dbo', 'TABLE', 'XT_CDATA', 'COLUMN', 'check_computer'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '工作站|签出工作站（或末次签入工作站）','USER', 'dbo', 'TABLE', 'XT_CDATA', 'COLUMN', 'check_computer'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('XT_CDATA') AND c.name = 'check_datetime')
	EXEC sys.sp_addextendedproperty 'MS_Description', '操作时间|签出时间（或末次签入时间）','USER', 'dbo', 'TABLE', 'XT_CDATA', 'COLUMN', 'check_datetime'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '操作时间|签出时间（或末次签入时间）','USER', 'dbo', 'TABLE', 'XT_CDATA', 'COLUMN', 'check_datetime' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('XT_CDATA') AND name = 'PK_XT_CDATA') 
	BEGIN 
		ALTER TABLE XT_CDATA ADD CONSTRAINT PK_XT_CDATA PRIMARY KEY(mdata_key,mdata_type);
		PRINT '	创建索引: PK_XT_CDATA' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('XT_CDATA') AND name = 'IX_XT_CDATA') 
	BEGIN 
		CREATE INDEX IX_XT_CDATA on XT_CDATA(mdata_type);
		PRINT '	创建索引: IX_XT_CDATA' 
	END 
GO  

PRINT '表: XT_CSQL' 
DECLARE @objectId INTEGER 
SET @objectId = OBJECT_ID('XT_CSQL','U') 
IF (@objectId IS NULL) 
	BEGIN	  
		CREATE TABLE XT_CSQL ( 
			[database_key] varchar(20) NOT NULL,
			[table_key] varchar(52) NOT NULL,
			[sql_id] int NOT NULL,
			[sql_type] varchar(20) NOT NULL,
			[sql_title] varchar(100) NOT NULL,
			[sql_checkin_status] int DEFAULT((0)) NOT NULL,
			[sql_checkin_time] datetime,
			[sql_exec_status] int DEFAULT((0)) NOT NULL,
			[sql_exec_time] datetime,
			[sql_remark] varchar(512),
			[sql_sql] text NOT NULL,
			[creator] varchar(30) NOT NULL,
			[cdate] datetime NOT NULL,
			[modifier] varchar(30),
			[mdate] datetime
		) 
		PRINT '	创建表: XT_CSQL' 
	END 

IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('XT_CSQL','U') AND name = 'database_key') 
	BEGIN 
		ALTER TABLE XT_CSQL ADD [database_key] varchar(20) NOT NULL 
		PRINT '	创建字段: XT_CSQL.database_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('XT_CSQL','U') AND name = 'table_key') 
	BEGIN 
		ALTER TABLE XT_CSQL ADD [table_key] varchar(52) NOT NULL 
		PRINT '	创建字段: XT_CSQL.table_key' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('XT_CSQL','U') AND name = 'sql_id') 
	BEGIN 
		ALTER TABLE XT_CSQL ADD [sql_id] int NOT NULL 
		PRINT '	创建字段: XT_CSQL.sql_id' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('XT_CSQL','U') AND name = 'sql_type') 
	BEGIN 
		ALTER TABLE XT_CSQL ADD [sql_type] varchar(20) NOT NULL 
		PRINT '	创建字段: XT_CSQL.sql_type' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('XT_CSQL','U') AND name = 'sql_title') 
	BEGIN 
		ALTER TABLE XT_CSQL ADD [sql_title] varchar(100) NOT NULL 
		PRINT '	创建字段: XT_CSQL.sql_title' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('XT_CSQL','U') AND name = 'sql_checkin_status') 
	BEGIN 
		ALTER TABLE XT_CSQL ADD [sql_checkin_status] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: XT_CSQL.sql_checkin_status' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('XT_CSQL','U') AND name = 'sql_checkin_time') 
	BEGIN 
		ALTER TABLE XT_CSQL ADD [sql_checkin_time] datetime 
		PRINT '	创建字段: XT_CSQL.sql_checkin_time' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('XT_CSQL','U') AND name = 'sql_exec_status') 
	BEGIN 
		ALTER TABLE XT_CSQL ADD [sql_exec_status] int DEFAULT((0)) NOT NULL 
		PRINT '	创建字段: XT_CSQL.sql_exec_status' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('XT_CSQL','U') AND name = 'sql_exec_time') 
	BEGIN 
		ALTER TABLE XT_CSQL ADD [sql_exec_time] datetime 
		PRINT '	创建字段: XT_CSQL.sql_exec_time' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('XT_CSQL','U') AND name = 'sql_remark') 
	BEGIN 
		ALTER TABLE XT_CSQL ADD [sql_remark] varchar(512) 
		PRINT '	创建字段: XT_CSQL.sql_remark' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('XT_CSQL','U') AND name = 'sql_sql') 
	BEGIN 
		ALTER TABLE XT_CSQL ADD [sql_sql] text NOT NULL 
		PRINT '	创建字段: XT_CSQL.sql_sql' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('XT_CSQL','U') AND name = 'creator') 
	BEGIN 
		ALTER TABLE XT_CSQL ADD [creator] varchar(30) NOT NULL 
		PRINT '	创建字段: XT_CSQL.creator' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('XT_CSQL','U') AND name = 'cdate') 
	BEGIN 
		ALTER TABLE XT_CSQL ADD [cdate] datetime NOT NULL 
		PRINT '	创建字段: XT_CSQL.cdate' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('XT_CSQL','U') AND name = 'modifier') 
	BEGIN 
		ALTER TABLE XT_CSQL ADD [modifier] varchar(30) 
		PRINT '	创建字段: XT_CSQL.modifier' 
	END 
IF NOT EXISTS (SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('XT_CSQL','U') AND name = 'mdate') 
	BEGIN 
		ALTER TABLE XT_CSQL ADD [mdate] datetime 
		PRINT '	创建字段: XT_CSQL.mdate' 
	END 

IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('XT_CSQL') AND c.name = 'sql_id')
	EXEC sys.sp_addextendedproperty 'MS_Description', '主键|非自增量','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'sql_id'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '主键|非自增量','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'sql_id'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('XT_CSQL') AND c.name = 'sql_type')
	EXEC sys.sp_addextendedproperty 'MS_Description', '脚本类型|create_table：创建表；alter column：修改字段；etc.','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'sql_type'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '脚本类型|create_table：创建表；alter column：修改字段；etc.','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'sql_type'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('XT_CSQL') AND c.name = 'sql_title')
	EXEC sys.sp_addextendedproperty 'MS_Description', 'SQL标题','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'sql_title'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', 'SQL标题','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'sql_title'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('XT_CSQL') AND c.name = 'sql_checkin_status')
	EXEC sys.sp_addextendedproperty 'MS_Description', '签入状态|0：默认值，未签入；1：已签入','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'sql_checkin_status'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '签入状态|0：默认值，未签入；1：已签入','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'sql_checkin_status'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('XT_CSQL') AND c.name = 'sql_checkin_time')
	EXEC sys.sp_addextendedproperty 'MS_Description', '签入时间|末次签入时间，服务器时间','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'sql_checkin_time'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '签入时间|末次签入时间，服务器时间','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'sql_checkin_time'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('XT_CSQL') AND c.name = 'sql_exec_status')
	EXEC sys.sp_addextendedproperty 'MS_Description', '执行状态|0：默认值，未执行；-1：已执行；1：执行失败','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'sql_exec_status'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '执行状态|0：默认值，未执行；-1：已执行；1：执行失败','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'sql_exec_status'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('XT_CSQL') AND c.name = 'sql_exec_time')
	EXEC sys.sp_addextendedproperty 'MS_Description', '执行时间','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'sql_exec_time'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '执行时间','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'sql_exec_time'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('XT_CSQL') AND c.name = 'sql_remark')
	EXEC sys.sp_addextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'sql_remark'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '备注','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'sql_remark'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('XT_CSQL') AND c.name = 'sql_sql')
	EXEC sys.sp_addextendedproperty 'MS_Description', 'SQL正文','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'sql_sql'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', 'SQL正文','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'sql_sql'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('XT_CSQL') AND c.name = 'cdate')
	EXEC sys.sp_addextendedproperty 'MS_Description', '创建时间|客户端时间','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'cdate'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '创建时间|客户端时间','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'cdate'
IF NOT EXISTS (SELECT ex.value FROM syscolumns c INNER JOIN sys.extended_properties ex ON c.id = ex.major_id AND c.colid = ex.minor_id INNER JOIN sysobjects obj on c.id = obj.id AND c.id = object_id('XT_CSQL') AND c.name = 'mdate')
	EXEC sys.sp_addextendedproperty 'MS_Description', '修改时间|客户端时间','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'mdate'
ELSE
	EXEC sys.sp_updateextendedproperty 'MS_Description', '修改时间|客户端时间','USER', 'dbo', 'TABLE', 'XT_CSQL', 'COLUMN', 'mdate' 

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('XT_CSQL') AND name = 'PK_XT_CSQL') 
	BEGIN 
		ALTER TABLE XT_CSQL ADD CONSTRAINT PK_XT_CSQL PRIMARY KEY(sql_id);
		PRINT '	创建索引: PK_XT_CSQL' 
	END 
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('XT_CSQL') AND name = 'IX_XT_CSQL') 
	BEGIN 
		CREATE INDEX IX_XT_CSQL on XT_CSQL(sql_checkin_time);
		PRINT '	创建索引: IX_XT_CSQL' 
	END 
GO  

UPDATE ST_SYSTEM SET system_version = 7 WHERE system_key = 'X99'