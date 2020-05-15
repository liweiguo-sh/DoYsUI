DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_DATABASE;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_DATABASE') then	  
				CREATE TABLE ST_DATABASE ( 
					database_key varchar(20) NOT NULL COMMENT '逻辑数据库名称|项目创建后不可修改,需和连接池名称一致',
					database_name varchar(20) NOT NULL COMMENT '物理数据库名称|可以根据实际需要更换数据库名称',
					database_text varchar(30) NOT NULL COMMENT '数据库名称',
					database_type varchar(20) NOT NULL COMMENT '数据库类型',
					database_version varchar(10) COMMENT '数据库版本',
					database_owner varchar(20),
					database_remark varchar(200),
					creator varchar(20),
					cdate datetime,
					modifier varchar(20),
					mdate datetime
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_DATABASE' and COLUMN_NAME = 'database_key') then 
			ALTER TABLE ST_DATABASE ADD database_key varchar(20) NOT NULL COMMENT '逻辑数据库名称|项目创建后不可修改,需和连接池名称一致';
		else 
			ALTER TABLE ST_DATABASE CHANGE database_key database_key varchar(20) NOT NULL COMMENT '逻辑数据库名称|项目创建后不可修改,需和连接池名称一致';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_DATABASE' and COLUMN_NAME = 'database_name') then 
			ALTER TABLE ST_DATABASE ADD database_name varchar(20) NOT NULL COMMENT '物理数据库名称|可以根据实际需要更换数据库名称';
		else 
			ALTER TABLE ST_DATABASE CHANGE database_name database_name varchar(20) NOT NULL COMMENT '物理数据库名称|可以根据实际需要更换数据库名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_DATABASE' and COLUMN_NAME = 'database_text') then 
			ALTER TABLE ST_DATABASE ADD database_text varchar(30) NOT NULL COMMENT '数据库名称';
		else 
			ALTER TABLE ST_DATABASE CHANGE database_text database_text varchar(30) NOT NULL COMMENT '数据库名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_DATABASE' and COLUMN_NAME = 'database_type') then 
			ALTER TABLE ST_DATABASE ADD database_type varchar(20) NOT NULL COMMENT '数据库类型';
		else 
			ALTER TABLE ST_DATABASE CHANGE database_type database_type varchar(20) NOT NULL COMMENT '数据库类型';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_DATABASE' and COLUMN_NAME = 'database_version') then 
			ALTER TABLE ST_DATABASE ADD database_version varchar(10) COMMENT '数据库版本';
		else 
			ALTER TABLE ST_DATABASE CHANGE database_version database_version varchar(10) COMMENT '数据库版本';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_DATABASE' and COLUMN_NAME = 'database_owner') then 
			ALTER TABLE ST_DATABASE ADD database_owner varchar(20);
		else 
			ALTER TABLE ST_DATABASE CHANGE database_owner database_owner varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_DATABASE' and COLUMN_NAME = 'database_remark') then 
			ALTER TABLE ST_DATABASE ADD database_remark varchar(200);
		else 
			ALTER TABLE ST_DATABASE CHANGE database_remark database_remark varchar(200);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_DATABASE' and COLUMN_NAME = 'creator') then 
			ALTER TABLE ST_DATABASE ADD creator varchar(20);
		else 
			ALTER TABLE ST_DATABASE CHANGE creator creator varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_DATABASE' and COLUMN_NAME = 'cdate') then 
			ALTER TABLE ST_DATABASE ADD cdate datetime;
		else 
			ALTER TABLE ST_DATABASE CHANGE cdate cdate datetime;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_DATABASE' and COLUMN_NAME = 'modifier') then 
			ALTER TABLE ST_DATABASE ADD modifier varchar(20);
		else 
			ALTER TABLE ST_DATABASE CHANGE modifier modifier varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_DATABASE' and COLUMN_NAME = 'mdate') then 
			ALTER TABLE ST_DATABASE ADD mdate datetime;
		else 
			ALTER TABLE ST_DATABASE CHANGE mdate mdate datetime;
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_DATABASE' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_DATABASE ADD PRIMARY KEY(database_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_FIELD;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_FIELD') then	  
				CREATE TABLE ST_FIELD ( 
					table_key varchar(52) NOT NULL COMMENT '外键,table.table_key',
					field_key varchar(82) NOT NULL,
					field_name varchar(30) NOT NULL COMMENT '字段名称',
					field_title varchar(50) COMMENT '字段提示|显示在界面上,供用户参考',
					field_type varchar(10) COMMENT '精简数据类型|string、datetime、number',
					datatype varchar(20) COMMENT '物理字段类型|数据库中的实际数据类型，与数据库有关',
					field_text varchar(50) COMMENT '字段中文名称',
					field_length int COMMENT '字段长度,',
					field_pkey int COMMENT '是否主键字段',
					field_identity int COMMENT '是否自增量字段',
					field_nullable int COMMENT '是否允许为空',
					field_updatable int COMMENT '是否允许更新|例如计算列',
					field_editable int COMMENT '允许手工编辑',
					field_default varchar(50) COMMENT '默认值|新建记录时自动填充',
					field_grid_format varchar(30) COMMENT '网格界面格式',
					field_align varchar(10) COMMENT '对齐方向',
					field_pixel_width int COMMENT '网格宽度',
					field_input_format varchar(30) COMMENT '输入界面格式',
					field_validation_key varchar(30) COMMENT 'field_validation.key|字段值校验规则',
					field_control_type varchar(20) COMMENT '控件类型|控件数据来源等同查询',
					field_query_type varchar(10) COMMENT '查询类型|文本输入、选择框、日期空间、下拉框、树、自定义窗口等',
					field_query_key varchar(30) COMMENT 'field_query.key',
					field_query_source varchar(200) COMMENT '数据源字符串或SQL语句|如果是有query_key的情况，表示为条件语句',
					field_query_order int COMMENT '查询序号',
					field_note varchar(200) COMMENT '字段数据库注释|在数据库表中的注释内容',
					field_remark varchar(200) COMMENT '字段说明|供程序员参考',
					creator varchar(20),
					cdate datetime,
					modifier varchar(20),
					mdate datetime
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'table_key') then 
			ALTER TABLE ST_FIELD ADD table_key varchar(52) NOT NULL COMMENT '外键,table.table_key';
		else 
			ALTER TABLE ST_FIELD CHANGE table_key table_key varchar(52) NOT NULL COMMENT '外键,table.table_key';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_key') then 
			ALTER TABLE ST_FIELD ADD field_key varchar(82) NOT NULL;
		else 
			ALTER TABLE ST_FIELD CHANGE field_key field_key varchar(82) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_name') then 
			ALTER TABLE ST_FIELD ADD field_name varchar(30) NOT NULL COMMENT '字段名称';
		else 
			ALTER TABLE ST_FIELD CHANGE field_name field_name varchar(30) NOT NULL COMMENT '字段名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_title') then 
			ALTER TABLE ST_FIELD ADD field_title varchar(50) COMMENT '字段提示|显示在界面上,供用户参考';
		else 
			ALTER TABLE ST_FIELD CHANGE field_title field_title varchar(50) COMMENT '字段提示|显示在界面上,供用户参考';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_type') then 
			ALTER TABLE ST_FIELD ADD field_type varchar(10) COMMENT '精简数据类型|string、datetime、number';
		else 
			ALTER TABLE ST_FIELD CHANGE field_type field_type varchar(10) COMMENT '精简数据类型|string、datetime、number';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'datatype') then 
			ALTER TABLE ST_FIELD ADD datatype varchar(20) COMMENT '物理字段类型|数据库中的实际数据类型，与数据库有关';
		else 
			ALTER TABLE ST_FIELD CHANGE datatype datatype varchar(20) COMMENT '物理字段类型|数据库中的实际数据类型，与数据库有关';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_text') then 
			ALTER TABLE ST_FIELD ADD field_text varchar(50) COMMENT '字段中文名称';
		else 
			ALTER TABLE ST_FIELD CHANGE field_text field_text varchar(50) COMMENT '字段中文名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_length') then 
			ALTER TABLE ST_FIELD ADD field_length int COMMENT '字段长度,';
		else 
			ALTER TABLE ST_FIELD CHANGE field_length field_length int COMMENT '字段长度,';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_pkey') then 
			ALTER TABLE ST_FIELD ADD field_pkey int COMMENT '是否主键字段';
		else 
			ALTER TABLE ST_FIELD CHANGE field_pkey field_pkey int COMMENT '是否主键字段';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_identity') then 
			ALTER TABLE ST_FIELD ADD field_identity int COMMENT '是否自增量字段';
		else 
			ALTER TABLE ST_FIELD CHANGE field_identity field_identity int COMMENT '是否自增量字段';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_nullable') then 
			ALTER TABLE ST_FIELD ADD field_nullable int COMMENT '是否允许为空';
		else 
			ALTER TABLE ST_FIELD CHANGE field_nullable field_nullable int COMMENT '是否允许为空';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_updatable') then 
			ALTER TABLE ST_FIELD ADD field_updatable int COMMENT '是否允许更新|例如计算列';
		else 
			ALTER TABLE ST_FIELD CHANGE field_updatable field_updatable int COMMENT '是否允许更新|例如计算列';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_editable') then 
			ALTER TABLE ST_FIELD ADD field_editable int COMMENT '允许手工编辑';
		else 
			ALTER TABLE ST_FIELD CHANGE field_editable field_editable int COMMENT '允许手工编辑';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_default') then 
			ALTER TABLE ST_FIELD ADD field_default varchar(50) COMMENT '默认值|新建记录时自动填充';
		else 
			ALTER TABLE ST_FIELD CHANGE field_default field_default varchar(50) COMMENT '默认值|新建记录时自动填充';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_grid_format') then 
			ALTER TABLE ST_FIELD ADD field_grid_format varchar(30) COMMENT '网格界面格式';
		else 
			ALTER TABLE ST_FIELD CHANGE field_grid_format field_grid_format varchar(30) COMMENT '网格界面格式';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_align') then 
			ALTER TABLE ST_FIELD ADD field_align varchar(10) COMMENT '对齐方向';
		else 
			ALTER TABLE ST_FIELD CHANGE field_align field_align varchar(10) COMMENT '对齐方向';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_pixel_width') then 
			ALTER TABLE ST_FIELD ADD field_pixel_width int COMMENT '网格宽度';
		else 
			ALTER TABLE ST_FIELD CHANGE field_pixel_width field_pixel_width int COMMENT '网格宽度';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_input_format') then 
			ALTER TABLE ST_FIELD ADD field_input_format varchar(30) COMMENT '输入界面格式';
		else 
			ALTER TABLE ST_FIELD CHANGE field_input_format field_input_format varchar(30) COMMENT '输入界面格式';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_validation_key') then 
			ALTER TABLE ST_FIELD ADD field_validation_key varchar(30) COMMENT 'field_validation.key|字段值校验规则';
		else 
			ALTER TABLE ST_FIELD CHANGE field_validation_key field_validation_key varchar(30) COMMENT 'field_validation.key|字段值校验规则';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_control_type') then 
			ALTER TABLE ST_FIELD ADD field_control_type varchar(20) COMMENT '控件类型|控件数据来源等同查询';
		else 
			ALTER TABLE ST_FIELD CHANGE field_control_type field_control_type varchar(20) COMMENT '控件类型|控件数据来源等同查询';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_query_type') then 
			ALTER TABLE ST_FIELD ADD field_query_type varchar(10) COMMENT '查询类型|文本输入、选择框、日期空间、下拉框、树、自定义窗口等';
		else 
			ALTER TABLE ST_FIELD CHANGE field_query_type field_query_type varchar(10) COMMENT '查询类型|文本输入、选择框、日期空间、下拉框、树、自定义窗口等';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_query_key') then 
			ALTER TABLE ST_FIELD ADD field_query_key varchar(30) COMMENT 'field_query.key';
		else 
			ALTER TABLE ST_FIELD CHANGE field_query_key field_query_key varchar(30) COMMENT 'field_query.key';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_query_source') then 
			ALTER TABLE ST_FIELD ADD field_query_source varchar(200) COMMENT '数据源字符串或SQL语句|如果是有query_key的情况，表示为条件语句';
		else 
			ALTER TABLE ST_FIELD CHANGE field_query_source field_query_source varchar(200) COMMENT '数据源字符串或SQL语句|如果是有query_key的情况，表示为条件语句';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_query_order') then 
			ALTER TABLE ST_FIELD ADD field_query_order int COMMENT '查询序号';
		else 
			ALTER TABLE ST_FIELD CHANGE field_query_order field_query_order int COMMENT '查询序号';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_note') then 
			ALTER TABLE ST_FIELD ADD field_note varchar(200) COMMENT '字段数据库注释|在数据库表中的注释内容';
		else 
			ALTER TABLE ST_FIELD CHANGE field_note field_note varchar(200) COMMENT '字段数据库注释|在数据库表中的注释内容';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'field_remark') then 
			ALTER TABLE ST_FIELD ADD field_remark varchar(200) COMMENT '字段说明|供程序员参考';
		else 
			ALTER TABLE ST_FIELD CHANGE field_remark field_remark varchar(200) COMMENT '字段说明|供程序员参考';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'creator') then 
			ALTER TABLE ST_FIELD ADD creator varchar(20);
		else 
			ALTER TABLE ST_FIELD CHANGE creator creator varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'cdate') then 
			ALTER TABLE ST_FIELD ADD cdate datetime;
		else 
			ALTER TABLE ST_FIELD CHANGE cdate cdate datetime;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'modifier') then 
			ALTER TABLE ST_FIELD ADD modifier varchar(20);
		else 
			ALTER TABLE ST_FIELD CHANGE modifier modifier varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD' and COLUMN_NAME = 'mdate') then 
			ALTER TABLE ST_FIELD ADD mdate datetime;
		else 
			ALTER TABLE ST_FIELD CHANGE mdate mdate datetime;
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_FIELD' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_FIELD ADD PRIMARY KEY(field_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_FIELD_QUERY;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_FIELD_QUERY') then	  
				CREATE TABLE ST_FIELD_QUERY ( 
					field_query_key varchar(30) NOT NULL
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FIELD_QUERY' and COLUMN_NAME = 'field_query_key') then 
			ALTER TABLE ST_FIELD_QUERY ADD field_query_key varchar(30) NOT NULL;
		else 
			ALTER TABLE ST_FIELD_QUERY CHANGE field_query_key field_query_key varchar(30) NOT NULL;
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_FIELD_QUERY' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_FIELD_QUERY ADD PRIMARY KEY(field_query_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_FLOW;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_FLOW') then	  
				CREATE TABLE ST_FLOW ( 
					flow_key varchar(30) NOT NULL,
					flow_name varchar(30) NOT NULL COMMENT '流程名称',
					flow_root_filter varchar(500) COMMENT '流程根节点条件',
					flow_allow_batch int DEFAULT 0  NOT NULL COMMENT '是否允许批量操作',
					flow_form_target varchar(100) COMMENT '后台类包|批量处理时，非标准编辑界面对应的后台类',
					flow_remark varchar(200) COMMENT '备注',
					creator varchar(30) NOT NULL,
					cdate datetime NOT NULL,
					modifier varchar(30),
					mdate datetime
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW' and COLUMN_NAME = 'flow_key') then 
			ALTER TABLE ST_FLOW ADD flow_key varchar(30) NOT NULL;
		else 
			ALTER TABLE ST_FLOW CHANGE flow_key flow_key varchar(30) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW' and COLUMN_NAME = 'flow_name') then 
			ALTER TABLE ST_FLOW ADD flow_name varchar(30) NOT NULL COMMENT '流程名称';
		else 
			ALTER TABLE ST_FLOW CHANGE flow_name flow_name varchar(30) NOT NULL COMMENT '流程名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW' and COLUMN_NAME = 'flow_root_filter') then 
			ALTER TABLE ST_FLOW ADD flow_root_filter varchar(500) COMMENT '流程根节点条件';
		else 
			ALTER TABLE ST_FLOW CHANGE flow_root_filter flow_root_filter varchar(500) COMMENT '流程根节点条件';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW' and COLUMN_NAME = 'flow_allow_batch') then 
			ALTER TABLE ST_FLOW ADD flow_allow_batch int DEFAULT 0  NOT NULL COMMENT '是否允许批量操作';
		else 
			ALTER TABLE ST_FLOW CHANGE flow_allow_batch flow_allow_batch int DEFAULT 0  NOT NULL COMMENT '是否允许批量操作';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW' and COLUMN_NAME = 'flow_form_target') then 
			ALTER TABLE ST_FLOW ADD flow_form_target varchar(100) COMMENT '后台类包|批量处理时，非标准编辑界面对应的后台类';
		else 
			ALTER TABLE ST_FLOW CHANGE flow_form_target flow_form_target varchar(100) COMMENT '后台类包|批量处理时，非标准编辑界面对应的后台类';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW' and COLUMN_NAME = 'flow_remark') then 
			ALTER TABLE ST_FLOW ADD flow_remark varchar(200) COMMENT '备注';
		else 
			ALTER TABLE ST_FLOW CHANGE flow_remark flow_remark varchar(200) COMMENT '备注';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW' and COLUMN_NAME = 'creator') then 
			ALTER TABLE ST_FLOW ADD creator varchar(30) NOT NULL;
		else 
			ALTER TABLE ST_FLOW CHANGE creator creator varchar(30) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW' and COLUMN_NAME = 'cdate') then 
			ALTER TABLE ST_FLOW ADD cdate datetime NOT NULL;
		else 
			ALTER TABLE ST_FLOW CHANGE cdate cdate datetime NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW' and COLUMN_NAME = 'modifier') then 
			ALTER TABLE ST_FLOW ADD modifier varchar(30);
		else 
			ALTER TABLE ST_FLOW CHANGE modifier modifier varchar(30);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW' and COLUMN_NAME = 'mdate') then 
			ALTER TABLE ST_FLOW ADD mdate datetime;
		else 
			ALTER TABLE ST_FLOW CHANGE mdate mdate datetime;
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_FLOW' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_FLOW ADD PRIMARY KEY(flow_key);
		end if;
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_FLOW' and index_name = 'IX_ST_FLOW') then 
			ALTER TABLE ST_FLOW ADD UNIQUE INDEX IX_ST_FLOW(flow_name);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_FLOW_BUTTON;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_FLOW_BUTTON') then	  
				CREATE TABLE ST_FLOW_BUTTON ( 
					flow_key varchar(30) NOT NULL,
					fb_key varchar(30) NOT NULL COMMENT '按钮标识',
					fb_name varchar(30) NOT NULL COMMENT '按钮名称',
					fb_tip varchar(100) COMMENT '按钮提示',
					fb_groups varchar(100) COMMENT '用户组',
					fb_users varchar(100) COMMENT '用户',
					fb_sql_condition varchar(100) COMMENT '条件SQL|符合当前按钮操作的条件，SQL语法',
					fb_field_status varchar(30) DEFAULT '0'  NOT NULL COMMENT '状态字段',
					fb_status_value int DEFAULT 1  NOT NULL COMMENT '审核后状态值|执行该操作之后的值',
					fb_field_note varchar(30) COMMENT '内容字段',
					fb_field_auditor varchar(30) COMMENT '审核人字段',
					fb_field_adate varchar(30) COMMENT '审核时间字段',
					fb_remove_option int DEFAULT 1  NOT NULL COMMENT '移除选项|执行操作后是否移除当前记录，默认移除',
					fb_order int DEFAULT 0  NOT NULL
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_BUTTON' and COLUMN_NAME = 'flow_key') then 
			ALTER TABLE ST_FLOW_BUTTON ADD flow_key varchar(30) NOT NULL;
		else 
			ALTER TABLE ST_FLOW_BUTTON CHANGE flow_key flow_key varchar(30) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_BUTTON' and COLUMN_NAME = 'fb_key') then 
			ALTER TABLE ST_FLOW_BUTTON ADD fb_key varchar(30) NOT NULL COMMENT '按钮标识';
		else 
			ALTER TABLE ST_FLOW_BUTTON CHANGE fb_key fb_key varchar(30) NOT NULL COMMENT '按钮标识';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_BUTTON' and COLUMN_NAME = 'fb_name') then 
			ALTER TABLE ST_FLOW_BUTTON ADD fb_name varchar(30) NOT NULL COMMENT '按钮名称';
		else 
			ALTER TABLE ST_FLOW_BUTTON CHANGE fb_name fb_name varchar(30) NOT NULL COMMENT '按钮名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_BUTTON' and COLUMN_NAME = 'fb_tip') then 
			ALTER TABLE ST_FLOW_BUTTON ADD fb_tip varchar(100) COMMENT '按钮提示';
		else 
			ALTER TABLE ST_FLOW_BUTTON CHANGE fb_tip fb_tip varchar(100) COMMENT '按钮提示';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_BUTTON' and COLUMN_NAME = 'fb_groups') then 
			ALTER TABLE ST_FLOW_BUTTON ADD fb_groups varchar(100) COMMENT '用户组';
		else 
			ALTER TABLE ST_FLOW_BUTTON CHANGE fb_groups fb_groups varchar(100) COMMENT '用户组';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_BUTTON' and COLUMN_NAME = 'fb_users') then 
			ALTER TABLE ST_FLOW_BUTTON ADD fb_users varchar(100) COMMENT '用户';
		else 
			ALTER TABLE ST_FLOW_BUTTON CHANGE fb_users fb_users varchar(100) COMMENT '用户';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_BUTTON' and COLUMN_NAME = 'fb_sql_condition') then 
			ALTER TABLE ST_FLOW_BUTTON ADD fb_sql_condition varchar(100) COMMENT '条件SQL|符合当前按钮操作的条件，SQL语法';
		else 
			ALTER TABLE ST_FLOW_BUTTON CHANGE fb_sql_condition fb_sql_condition varchar(100) COMMENT '条件SQL|符合当前按钮操作的条件，SQL语法';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_BUTTON' and COLUMN_NAME = 'fb_field_status') then 
			ALTER TABLE ST_FLOW_BUTTON ADD fb_field_status varchar(30) DEFAULT '0'  NOT NULL COMMENT '状态字段';
		else 
			ALTER TABLE ST_FLOW_BUTTON CHANGE fb_field_status fb_field_status varchar(30) DEFAULT '0'  NOT NULL COMMENT '状态字段';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_BUTTON' and COLUMN_NAME = 'fb_status_value') then 
			ALTER TABLE ST_FLOW_BUTTON ADD fb_status_value int DEFAULT 1  NOT NULL COMMENT '审核后状态值|执行该操作之后的值';
		else 
			ALTER TABLE ST_FLOW_BUTTON CHANGE fb_status_value fb_status_value int DEFAULT 1  NOT NULL COMMENT '审核后状态值|执行该操作之后的值';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_BUTTON' and COLUMN_NAME = 'fb_field_note') then 
			ALTER TABLE ST_FLOW_BUTTON ADD fb_field_note varchar(30) COMMENT '内容字段';
		else 
			ALTER TABLE ST_FLOW_BUTTON CHANGE fb_field_note fb_field_note varchar(30) COMMENT '内容字段';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_BUTTON' and COLUMN_NAME = 'fb_field_auditor') then 
			ALTER TABLE ST_FLOW_BUTTON ADD fb_field_auditor varchar(30) COMMENT '审核人字段';
		else 
			ALTER TABLE ST_FLOW_BUTTON CHANGE fb_field_auditor fb_field_auditor varchar(30) COMMENT '审核人字段';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_BUTTON' and COLUMN_NAME = 'fb_field_adate') then 
			ALTER TABLE ST_FLOW_BUTTON ADD fb_field_adate varchar(30) COMMENT '审核时间字段';
		else 
			ALTER TABLE ST_FLOW_BUTTON CHANGE fb_field_adate fb_field_adate varchar(30) COMMENT '审核时间字段';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_BUTTON' and COLUMN_NAME = 'fb_remove_option') then 
			ALTER TABLE ST_FLOW_BUTTON ADD fb_remove_option int DEFAULT 1  NOT NULL COMMENT '移除选项|执行操作后是否移除当前记录，默认移除';
		else 
			ALTER TABLE ST_FLOW_BUTTON CHANGE fb_remove_option fb_remove_option int DEFAULT 1  NOT NULL COMMENT '移除选项|执行操作后是否移除当前记录，默认移除';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_BUTTON' and COLUMN_NAME = 'fb_order') then 
			ALTER TABLE ST_FLOW_BUTTON ADD fb_order int DEFAULT 0  NOT NULL;
		else 
			ALTER TABLE ST_FLOW_BUTTON CHANGE fb_order fb_order int DEFAULT 0  NOT NULL;
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_FLOW_BUTTON' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_FLOW_BUTTON ADD PRIMARY KEY(fb_key,flow_key);
		end if;
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_FLOW_BUTTON' and index_name = 'IX_ST_FLOW_BUTTON_flow_key') then 
			ALTER TABLE ST_FLOW_BUTTON ADD INDEX IX_ST_FLOW_BUTTON_flow_key(flow_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_FLOW_NODE;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_FLOW_NODE') then	  
				CREATE TABLE ST_FLOW_NODE ( 
					flow_key varchar(30) NOT NULL,
					fn_key varchar(5) NOT NULL COMMENT '节点标识',
					fn_name varchar(30) NOT NULL COMMENT '节点名称|例如：财务待审核',
					fn_show_option int DEFAULT 1  NOT NULL COMMENT '显示选项|-1：禁用；0：根据权限决定；1：显示，如无权限，SQL增加1=0',
					fn_filter varchar(512) NOT NULL COMMENT '节点数据条件',
					fn_groups varchar(100) COMMENT '用户组',
					fn_users varchar(100) COMMENT '用户',
					fn_order int DEFAULT 0  NOT NULL COMMENT '序号',
					fn_remark varchar(100) COMMENT '备注'
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_NODE' and COLUMN_NAME = 'flow_key') then 
			ALTER TABLE ST_FLOW_NODE ADD flow_key varchar(30) NOT NULL;
		else 
			ALTER TABLE ST_FLOW_NODE CHANGE flow_key flow_key varchar(30) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_NODE' and COLUMN_NAME = 'fn_key') then 
			ALTER TABLE ST_FLOW_NODE ADD fn_key varchar(5) NOT NULL COMMENT '节点标识';
		else 
			ALTER TABLE ST_FLOW_NODE CHANGE fn_key fn_key varchar(5) NOT NULL COMMENT '节点标识';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_NODE' and COLUMN_NAME = 'fn_name') then 
			ALTER TABLE ST_FLOW_NODE ADD fn_name varchar(30) NOT NULL COMMENT '节点名称|例如：财务待审核';
		else 
			ALTER TABLE ST_FLOW_NODE CHANGE fn_name fn_name varchar(30) NOT NULL COMMENT '节点名称|例如：财务待审核';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_NODE' and COLUMN_NAME = 'fn_show_option') then 
			ALTER TABLE ST_FLOW_NODE ADD fn_show_option int DEFAULT 1  NOT NULL COMMENT '显示选项|-1：禁用；0：根据权限决定；1：显示，如无权限，SQL增加1=0';
		else 
			ALTER TABLE ST_FLOW_NODE CHANGE fn_show_option fn_show_option int DEFAULT 1  NOT NULL COMMENT '显示选项|-1：禁用；0：根据权限决定；1：显示，如无权限，SQL增加1=0';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_NODE' and COLUMN_NAME = 'fn_filter') then 
			ALTER TABLE ST_FLOW_NODE ADD fn_filter varchar(512) NOT NULL COMMENT '节点数据条件';
		else 
			ALTER TABLE ST_FLOW_NODE CHANGE fn_filter fn_filter varchar(512) NOT NULL COMMENT '节点数据条件';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_NODE' and COLUMN_NAME = 'fn_groups') then 
			ALTER TABLE ST_FLOW_NODE ADD fn_groups varchar(100) COMMENT '用户组';
		else 
			ALTER TABLE ST_FLOW_NODE CHANGE fn_groups fn_groups varchar(100) COMMENT '用户组';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_NODE' and COLUMN_NAME = 'fn_users') then 
			ALTER TABLE ST_FLOW_NODE ADD fn_users varchar(100) COMMENT '用户';
		else 
			ALTER TABLE ST_FLOW_NODE CHANGE fn_users fn_users varchar(100) COMMENT '用户';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_NODE' and COLUMN_NAME = 'fn_order') then 
			ALTER TABLE ST_FLOW_NODE ADD fn_order int DEFAULT 0  NOT NULL COMMENT '序号';
		else 
			ALTER TABLE ST_FLOW_NODE CHANGE fn_order fn_order int DEFAULT 0  NOT NULL COMMENT '序号';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_FLOW_NODE' and COLUMN_NAME = 'fn_remark') then 
			ALTER TABLE ST_FLOW_NODE ADD fn_remark varchar(100) COMMENT '备注';
		else 
			ALTER TABLE ST_FLOW_NODE CHANGE fn_remark fn_remark varchar(100) COMMENT '备注';
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_FLOW_NODE' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_FLOW_NODE ADD PRIMARY KEY(flow_key,fn_key);
		end if;
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_FLOW_NODE' and index_name = 'IX_ST_FLOW_NODE') then 
			ALTER TABLE ST_FLOW_NODE ADD UNIQUE INDEX IX_ST_FLOW_NODE(fn_name,flow_key);
		end if;
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_FLOW_NODE' and index_name = 'FX_ST_FN_flow_key') then 
			ALTER TABLE ST_FLOW_NODE ADD INDEX FX_ST_FN_flow_key(flow_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_GROUP;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_GROUP') then	  
				CREATE TABLE ST_GROUP ( 
					office_id int NOT NULL COMMENT '用户组所属机构ID',
					group_key varchar(30) NOT NULL COMMENT '用户组标识',
					group_name varchar(30) NOT NULL COMMENT '用户组名称',
					group_inactive int DEFAULT 0  NOT NULL COMMENT '是否禁用',
					group_option1 int DEFAULT 0  NOT NULL COMMENT '下级可见|选项1：下级机构是否可见，默认不可见',
					group_type int DEFAULT 1  NOT NULL COMMENT '用户组类型|-1:开发组;0:系统内置组,例如管理员组; 1:用户自定义组',
					group_remark varchar(200),
					creator varchar(20),
					cdate datetime,
					modifier varchar(20),
					mdate datetime
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_GROUP' and COLUMN_NAME = 'office_id') then 
			ALTER TABLE ST_GROUP ADD office_id int NOT NULL COMMENT '用户组所属机构ID';
		else 
			ALTER TABLE ST_GROUP CHANGE office_id office_id int NOT NULL COMMENT '用户组所属机构ID';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_GROUP' and COLUMN_NAME = 'group_key') then 
			ALTER TABLE ST_GROUP ADD group_key varchar(30) NOT NULL COMMENT '用户组标识';
		else 
			ALTER TABLE ST_GROUP CHANGE group_key group_key varchar(30) NOT NULL COMMENT '用户组标识';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_GROUP' and COLUMN_NAME = 'group_name') then 
			ALTER TABLE ST_GROUP ADD group_name varchar(30) NOT NULL COMMENT '用户组名称';
		else 
			ALTER TABLE ST_GROUP CHANGE group_name group_name varchar(30) NOT NULL COMMENT '用户组名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_GROUP' and COLUMN_NAME = 'group_inactive') then 
			ALTER TABLE ST_GROUP ADD group_inactive int DEFAULT 0  NOT NULL COMMENT '是否禁用';
		else 
			ALTER TABLE ST_GROUP CHANGE group_inactive group_inactive int DEFAULT 0  NOT NULL COMMENT '是否禁用';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_GROUP' and COLUMN_NAME = 'group_option1') then 
			ALTER TABLE ST_GROUP ADD group_option1 int DEFAULT 0  NOT NULL COMMENT '下级可见|选项1：下级机构是否可见，默认不可见';
		else 
			ALTER TABLE ST_GROUP CHANGE group_option1 group_option1 int DEFAULT 0  NOT NULL COMMENT '下级可见|选项1：下级机构是否可见，默认不可见';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_GROUP' and COLUMN_NAME = 'group_type') then 
			ALTER TABLE ST_GROUP ADD group_type int DEFAULT 1  NOT NULL COMMENT '用户组类型|-1:开发组;0:系统内置组,例如管理员组; 1:用户自定义组';
		else 
			ALTER TABLE ST_GROUP CHANGE group_type group_type int DEFAULT 1  NOT NULL COMMENT '用户组类型|-1:开发组;0:系统内置组,例如管理员组; 1:用户自定义组';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_GROUP' and COLUMN_NAME = 'group_remark') then 
			ALTER TABLE ST_GROUP ADD group_remark varchar(200);
		else 
			ALTER TABLE ST_GROUP CHANGE group_remark group_remark varchar(200);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_GROUP' and COLUMN_NAME = 'creator') then 
			ALTER TABLE ST_GROUP ADD creator varchar(20);
		else 
			ALTER TABLE ST_GROUP CHANGE creator creator varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_GROUP' and COLUMN_NAME = 'cdate') then 
			ALTER TABLE ST_GROUP ADD cdate datetime;
		else 
			ALTER TABLE ST_GROUP CHANGE cdate cdate datetime;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_GROUP' and COLUMN_NAME = 'modifier') then 
			ALTER TABLE ST_GROUP ADD modifier varchar(20);
		else 
			ALTER TABLE ST_GROUP CHANGE modifier modifier varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_GROUP' and COLUMN_NAME = 'mdate') then 
			ALTER TABLE ST_GROUP ADD mdate datetime;
		else 
			ALTER TABLE ST_GROUP CHANGE mdate mdate datetime;
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_GROUP' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_GROUP ADD PRIMARY KEY(group_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_GROUP_USER;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_GROUP_USER') then	  
				CREATE TABLE ST_GROUP_USER ( 
					group_key varchar(30) NOT NULL,
					user_key varchar(30) NOT NULL
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_GROUP_USER' and COLUMN_NAME = 'group_key') then 
			ALTER TABLE ST_GROUP_USER ADD group_key varchar(30) NOT NULL;
		else 
			ALTER TABLE ST_GROUP_USER CHANGE group_key group_key varchar(30) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_GROUP_USER' and COLUMN_NAME = 'user_key') then 
			ALTER TABLE ST_GROUP_USER ADD user_key varchar(30) NOT NULL;
		else 
			ALTER TABLE ST_GROUP_USER CHANGE user_key user_key varchar(30) NOT NULL;
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_GROUP_USER' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_GROUP_USER ADD PRIMARY KEY(group_key,user_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_INDEX_FIELD;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_INDEX_FIELD') then	  
				CREATE TABLE ST_INDEX_FIELD ( 
					table_key varchar(52) NOT NULL,
					index_name varchar(30) NOT NULL,
					field_name varchar(30) NOT NULL,
					is_unique int NOT NULL,
					index_type int NOT NULL
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_INDEX_FIELD' and COLUMN_NAME = 'table_key') then 
			ALTER TABLE ST_INDEX_FIELD ADD table_key varchar(52) NOT NULL;
		else 
			ALTER TABLE ST_INDEX_FIELD CHANGE table_key table_key varchar(52) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_INDEX_FIELD' and COLUMN_NAME = 'index_name') then 
			ALTER TABLE ST_INDEX_FIELD ADD index_name varchar(30) NOT NULL;
		else 
			ALTER TABLE ST_INDEX_FIELD CHANGE index_name index_name varchar(30) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_INDEX_FIELD' and COLUMN_NAME = 'field_name') then 
			ALTER TABLE ST_INDEX_FIELD ADD field_name varchar(30) NOT NULL;
		else 
			ALTER TABLE ST_INDEX_FIELD CHANGE field_name field_name varchar(30) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_INDEX_FIELD' and COLUMN_NAME = 'is_unique') then 
			ALTER TABLE ST_INDEX_FIELD ADD is_unique int NOT NULL;
		else 
			ALTER TABLE ST_INDEX_FIELD CHANGE is_unique is_unique int NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_INDEX_FIELD' and COLUMN_NAME = 'index_type') then 
			ALTER TABLE ST_INDEX_FIELD ADD index_type int NOT NULL;
		else 
			ALTER TABLE ST_INDEX_FIELD CHANGE index_type index_type int NOT NULL;
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_INDEX_FIELD' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_INDEX_FIELD ADD PRIMARY KEY(field_name,index_name,table_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_LOG;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_LOG') then	  
				CREATE TABLE ST_LOG ( 
					log_id int AUTO_INCREMENT NOT NULL,
					log_time datetime NOT NULL COMMENT '日志时间|数据库时间',
					log_type varchar(10) NOT NULL COMMENT '日志类型|info、error、warn、debug',
					log_user_key varchar(20) NOT NULL,
					log_bus_type varchar(20) NOT NULL COMMENT '业务类型 ',
					log_desc varchar(512) NOT NULL COMMENT '日志描述'
				  ,  PRIMARY KEY (log_id)
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_LOG' and COLUMN_NAME = 'log_id') then 
			ALTER TABLE ST_LOG ADD log_id int AUTO_INCREMENT NOT NULL;
		else 
			ALTER TABLE ST_LOG CHANGE log_id log_id int AUTO_INCREMENT NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_LOG' and COLUMN_NAME = 'log_time') then 
			ALTER TABLE ST_LOG ADD log_time datetime NOT NULL COMMENT '日志时间|数据库时间';
		else 
			ALTER TABLE ST_LOG CHANGE log_time log_time datetime NOT NULL COMMENT '日志时间|数据库时间';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_LOG' and COLUMN_NAME = 'log_type') then 
			ALTER TABLE ST_LOG ADD log_type varchar(10) NOT NULL COMMENT '日志类型|info、error、warn、debug';
		else 
			ALTER TABLE ST_LOG CHANGE log_type log_type varchar(10) NOT NULL COMMENT '日志类型|info、error、warn、debug';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_LOG' and COLUMN_NAME = 'log_user_key') then 
			ALTER TABLE ST_LOG ADD log_user_key varchar(20) NOT NULL;
		else 
			ALTER TABLE ST_LOG CHANGE log_user_key log_user_key varchar(20) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_LOG' and COLUMN_NAME = 'log_bus_type') then 
			ALTER TABLE ST_LOG ADD log_bus_type varchar(20) NOT NULL COMMENT '业务类型 ';
		else 
			ALTER TABLE ST_LOG CHANGE log_bus_type log_bus_type varchar(20) NOT NULL COMMENT '业务类型 ';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_LOG' and COLUMN_NAME = 'log_desc') then 
			ALTER TABLE ST_LOG ADD log_desc varchar(512) NOT NULL COMMENT '日志描述';
		else 
			ALTER TABLE ST_LOG CHANGE log_desc log_desc varchar(512) NOT NULL COMMENT '日志描述';
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_LOG' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_LOG ADD PRIMARY KEY(log_id);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_MENU;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_MENU') then	  
				CREATE TABLE ST_MENU ( 
					pnode_key varchar(9) NOT NULL COMMENT '父节点key值|一级菜单父节点key值为子系统key',
					node_key varchar(12) NOT NULL COMMENT '节点key值|key值决定了菜单顺序，不建议手工操作，应通过界面调整',
					menu_key varchar(30) NOT NULL COMMENT '菜单标识|用于程序调用及权限设置时使用，手工保证值唯一',
					menu_text varchar(50) NOT NULL COMMENT '菜单标题',
					menu_client_type int DEFAULT 0  NOT NULL COMMENT '客户端类型|0：PC端菜单，1：微信端菜单',
					menu_type varchar(20) NOT NULL COMMENT '菜单类型|window、modal、fullwindow、uview、reprot and etc.',
					menu_type_value varchar(30) COMMENT '菜单类型对应的值|例如：视图名称、报表名称l等',
					menu_parameter varchar(100) COMMENT '菜单参数|例如为调用的视图增加条件',
					flow_key varchar(30) COMMENT '流程ID',
					menu_filter_first int DEFAULT 0  NOT NULL COMMENT '先筛选',
					menu_filter_must int DEFAULT 0  NOT NULL COMMENT '必须有筛选',
					menu_url varchar(100) COMMENT 'url|视图对应的编辑窗口、普通窗口url等',
					menu_tooltip varchar(30) COMMENT '菜单提示条',
					menu_display varchar(100) COMMENT '菜单功能描述',
					menu_icon varchar(20) COMMENT '菜单图标',
					menu_onlyone int COMMENT '只能同时打开一个|该菜单调用的功能不允许并行运行多个',
					menu_inactive int DEFAULT 0  NOT NULL COMMENT '是否禁用|1：禁用，0：启用',
					menu_order varchar(3) DEFAULT '999'  NOT NULL COMMENT '菜单序号',
					menu_sort varchar(50) COMMENT '框架排序用|该字段准备废弃不用，菜单排序参考视图SV_MENU',
					menu_remark varchar(200) COMMENT '备注',
					creator varchar(20),
					cdate datetime,
					modifier varchar(20),
					mdate datetime
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'pnode_key') then 
			ALTER TABLE ST_MENU ADD pnode_key varchar(9) NOT NULL COMMENT '父节点key值|一级菜单父节点key值为子系统key';
		else 
			ALTER TABLE ST_MENU CHANGE pnode_key pnode_key varchar(9) NOT NULL COMMENT '父节点key值|一级菜单父节点key值为子系统key';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'node_key') then 
			ALTER TABLE ST_MENU ADD node_key varchar(12) NOT NULL COMMENT '节点key值|key值决定了菜单顺序，不建议手工操作，应通过界面调整';
		else 
			ALTER TABLE ST_MENU CHANGE node_key node_key varchar(12) NOT NULL COMMENT '节点key值|key值决定了菜单顺序，不建议手工操作，应通过界面调整';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'menu_key') then 
			ALTER TABLE ST_MENU ADD menu_key varchar(30) NOT NULL COMMENT '菜单标识|用于程序调用及权限设置时使用，手工保证值唯一';
		else 
			ALTER TABLE ST_MENU CHANGE menu_key menu_key varchar(30) NOT NULL COMMENT '菜单标识|用于程序调用及权限设置时使用，手工保证值唯一';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'menu_text') then 
			ALTER TABLE ST_MENU ADD menu_text varchar(50) NOT NULL COMMENT '菜单标题';
		else 
			ALTER TABLE ST_MENU CHANGE menu_text menu_text varchar(50) NOT NULL COMMENT '菜单标题';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'menu_client_type') then 
			ALTER TABLE ST_MENU ADD menu_client_type int DEFAULT 0  NOT NULL COMMENT '客户端类型|0：PC端菜单，1：微信端菜单';
		else 
			ALTER TABLE ST_MENU CHANGE menu_client_type menu_client_type int DEFAULT 0  NOT NULL COMMENT '客户端类型|0：PC端菜单，1：微信端菜单';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'menu_type') then 
			ALTER TABLE ST_MENU ADD menu_type varchar(20) NOT NULL COMMENT '菜单类型|window、modal、fullwindow、uview、reprot and etc.';
		else 
			ALTER TABLE ST_MENU CHANGE menu_type menu_type varchar(20) NOT NULL COMMENT '菜单类型|window、modal、fullwindow、uview、reprot and etc.';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'menu_type_value') then 
			ALTER TABLE ST_MENU ADD menu_type_value varchar(30) COMMENT '菜单类型对应的值|例如：视图名称、报表名称l等';
		else 
			ALTER TABLE ST_MENU CHANGE menu_type_value menu_type_value varchar(30) COMMENT '菜单类型对应的值|例如：视图名称、报表名称l等';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'menu_parameter') then 
			ALTER TABLE ST_MENU ADD menu_parameter varchar(100) COMMENT '菜单参数|例如为调用的视图增加条件';
		else 
			ALTER TABLE ST_MENU CHANGE menu_parameter menu_parameter varchar(100) COMMENT '菜单参数|例如为调用的视图增加条件';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'flow_key') then 
			ALTER TABLE ST_MENU ADD flow_key varchar(30) COMMENT '流程ID';
		else 
			ALTER TABLE ST_MENU CHANGE flow_key flow_key varchar(30) COMMENT '流程ID';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'menu_filter_first') then 
			ALTER TABLE ST_MENU ADD menu_filter_first int DEFAULT 0  NOT NULL COMMENT '先筛选';
		else 
			ALTER TABLE ST_MENU CHANGE menu_filter_first menu_filter_first int DEFAULT 0  NOT NULL COMMENT '先筛选';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'menu_filter_must') then 
			ALTER TABLE ST_MENU ADD menu_filter_must int DEFAULT 0  NOT NULL COMMENT '必须有筛选';
		else 
			ALTER TABLE ST_MENU CHANGE menu_filter_must menu_filter_must int DEFAULT 0  NOT NULL COMMENT '必须有筛选';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'menu_url') then 
			ALTER TABLE ST_MENU ADD menu_url varchar(100) COMMENT 'url|视图对应的编辑窗口、普通窗口url等';
		else 
			ALTER TABLE ST_MENU CHANGE menu_url menu_url varchar(100) COMMENT 'url|视图对应的编辑窗口、普通窗口url等';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'menu_tooltip') then 
			ALTER TABLE ST_MENU ADD menu_tooltip varchar(30) COMMENT '菜单提示条';
		else 
			ALTER TABLE ST_MENU CHANGE menu_tooltip menu_tooltip varchar(30) COMMENT '菜单提示条';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'menu_display') then 
			ALTER TABLE ST_MENU ADD menu_display varchar(100) COMMENT '菜单功能描述';
		else 
			ALTER TABLE ST_MENU CHANGE menu_display menu_display varchar(100) COMMENT '菜单功能描述';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'menu_icon') then 
			ALTER TABLE ST_MENU ADD menu_icon varchar(20) COMMENT '菜单图标';
		else 
			ALTER TABLE ST_MENU CHANGE menu_icon menu_icon varchar(20) COMMENT '菜单图标';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'menu_onlyone') then 
			ALTER TABLE ST_MENU ADD menu_onlyone int COMMENT '只能同时打开一个|该菜单调用的功能不允许并行运行多个';
		else 
			ALTER TABLE ST_MENU CHANGE menu_onlyone menu_onlyone int COMMENT '只能同时打开一个|该菜单调用的功能不允许并行运行多个';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'menu_inactive') then 
			ALTER TABLE ST_MENU ADD menu_inactive int DEFAULT 0  NOT NULL COMMENT '是否禁用|1：禁用，0：启用';
		else 
			ALTER TABLE ST_MENU CHANGE menu_inactive menu_inactive int DEFAULT 0  NOT NULL COMMENT '是否禁用|1：禁用，0：启用';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'menu_order') then 
			ALTER TABLE ST_MENU ADD menu_order varchar(3) DEFAULT '999'  NOT NULL COMMENT '菜单序号';
		else 
			ALTER TABLE ST_MENU CHANGE menu_order menu_order varchar(3) DEFAULT '999'  NOT NULL COMMENT '菜单序号';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'menu_sort') then 
			ALTER TABLE ST_MENU ADD menu_sort varchar(50) COMMENT '框架排序用|该字段准备废弃不用，菜单排序参考视图SV_MENU';
		else 
			ALTER TABLE ST_MENU CHANGE menu_sort menu_sort varchar(50) COMMENT '框架排序用|该字段准备废弃不用，菜单排序参考视图SV_MENU';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'menu_remark') then 
			ALTER TABLE ST_MENU ADD menu_remark varchar(200) COMMENT '备注';
		else 
			ALTER TABLE ST_MENU CHANGE menu_remark menu_remark varchar(200) COMMENT '备注';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'creator') then 
			ALTER TABLE ST_MENU ADD creator varchar(20);
		else 
			ALTER TABLE ST_MENU CHANGE creator creator varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'cdate') then 
			ALTER TABLE ST_MENU ADD cdate datetime;
		else 
			ALTER TABLE ST_MENU CHANGE cdate cdate datetime;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'modifier') then 
			ALTER TABLE ST_MENU ADD modifier varchar(20);
		else 
			ALTER TABLE ST_MENU CHANGE modifier modifier varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU' and COLUMN_NAME = 'mdate') then 
			ALTER TABLE ST_MENU ADD mdate datetime;
		else 
			ALTER TABLE ST_MENU CHANGE mdate mdate datetime;
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_MENU' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_MENU ADD PRIMARY KEY(menu_key);
		end if;
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_MENU' and index_name = 'IX_ST_MENU_node_key') then 
			ALTER TABLE ST_MENU ADD UNIQUE INDEX IX_ST_MENU_node_key(node_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_MENU_ACL;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_MENU_ACL') then	  
				CREATE TABLE ST_MENU_ACL ( 
					menu_key varchar(30) NOT NULL,
					ug_key varchar(30) NOT NULL COMMENT '用户（组）标识',
					ug_type varchar(1) NOT NULL COMMENT '用户、用户组标志|U：用户，G：用户组',
					menu_acl_value int NOT NULL COMMENT '对菜单的访问权限|1：有访问权限，2：部分访问权限'
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU_ACL' and COLUMN_NAME = 'menu_key') then 
			ALTER TABLE ST_MENU_ACL ADD menu_key varchar(30) NOT NULL;
		else 
			ALTER TABLE ST_MENU_ACL CHANGE menu_key menu_key varchar(30) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU_ACL' and COLUMN_NAME = 'ug_key') then 
			ALTER TABLE ST_MENU_ACL ADD ug_key varchar(30) NOT NULL COMMENT '用户（组）标识';
		else 
			ALTER TABLE ST_MENU_ACL CHANGE ug_key ug_key varchar(30) NOT NULL COMMENT '用户（组）标识';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU_ACL' and COLUMN_NAME = 'ug_type') then 
			ALTER TABLE ST_MENU_ACL ADD ug_type varchar(1) NOT NULL COMMENT '用户、用户组标志|U：用户，G：用户组';
		else 
			ALTER TABLE ST_MENU_ACL CHANGE ug_type ug_type varchar(1) NOT NULL COMMENT '用户、用户组标志|U：用户，G：用户组';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_MENU_ACL' and COLUMN_NAME = 'menu_acl_value') then 
			ALTER TABLE ST_MENU_ACL ADD menu_acl_value int NOT NULL COMMENT '对菜单的访问权限|1：有访问权限，2：部分访问权限';
		else 
			ALTER TABLE ST_MENU_ACL CHANGE menu_acl_value menu_acl_value int NOT NULL COMMENT '对菜单的访问权限|1：有访问权限，2：部分访问权限';
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_MENU_ACL' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_MENU_ACL ADD PRIMARY KEY(menu_key,ug_key,ug_type);
		end if;
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_MENU_ACL' and index_name = 'IX_ST_MENU_ACL_menu_key') then 
			ALTER TABLE ST_MENU_ACL ADD INDEX IX_ST_MENU_ACL_menu_key(menu_key);
		end if;
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_MENU_ACL' and index_name = 'IX_ST_MENU_ACL_ug') then 
			ALTER TABLE ST_MENU_ACL ADD INDEX IX_ST_MENU_ACL_ug(ug_type,ug_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_OFFICE;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_OFFICE') then	  
				CREATE TABLE ST_OFFICE ( 
					poffice_id int NOT NULL COMMENT '上级机构ID',
					office_id int AUTO_INCREMENT NOT NULL,
					office_name varchar(50) NOT NULL COMMENT '机构名称',
					office_shortname varchar(30) COMMENT '机构简称',
					office_fullname varchar(100) COMMENT '机构全称|机构完整层级路径',
					node_key varchar(21),
					office_code varchar(20) COMMENT '机构代码',
					office_level_type int COMMENT '机构级别类型|示例：0：集团；1：企业；2：一级部门；3：二级部门',
					office_type int DEFAULT 0  COMMENT '机构类型|示例：0：内部机构；1：供应商机构；2：客户机构',
					office_is_last_level int DEFAULT 1  NOT NULL COMMENT '是否末级机构',
					office_hide int DEFAULT 0  NOT NULL COMMENT '禁用',
					office1_id int COMMENT '1级机构ID',
					office1_name varchar(30) COMMENT '1级机构名称',
					office2_id int,
					office2_name varchar(30),
					office3_id int,
					office3_name varchar(30),
					office_order int DEFAULT 999  NOT NULL COMMENT '序号',
					office_full_order varchar(27) COMMENT '全排列序号',
					office_remark varchar(100) COMMENT '备注',
					creator varchar(20),
					cdate datetime,
					modifier varchar(20),
					mdate datetime,
					deletor varchar(20) COMMENT '删除人',
					ddate datetime COMMENT '删除时间',
					del_tag int DEFAULT 0  NOT NULL COMMENT '删除标志'
				  ,  PRIMARY KEY (office_id)
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'poffice_id') then 
			ALTER TABLE ST_OFFICE ADD poffice_id int NOT NULL COMMENT '上级机构ID';
		else 
			ALTER TABLE ST_OFFICE CHANGE poffice_id poffice_id int NOT NULL COMMENT '上级机构ID';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'office_id') then 
			ALTER TABLE ST_OFFICE ADD office_id int AUTO_INCREMENT NOT NULL;
		else 
			ALTER TABLE ST_OFFICE CHANGE office_id office_id int AUTO_INCREMENT NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'office_name') then 
			ALTER TABLE ST_OFFICE ADD office_name varchar(50) NOT NULL COMMENT '机构名称';
		else 
			ALTER TABLE ST_OFFICE CHANGE office_name office_name varchar(50) NOT NULL COMMENT '机构名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'office_shortname') then 
			ALTER TABLE ST_OFFICE ADD office_shortname varchar(30) COMMENT '机构简称';
		else 
			ALTER TABLE ST_OFFICE CHANGE office_shortname office_shortname varchar(30) COMMENT '机构简称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'office_fullname') then 
			ALTER TABLE ST_OFFICE ADD office_fullname varchar(100) COMMENT '机构全称|机构完整层级路径';
		else 
			ALTER TABLE ST_OFFICE CHANGE office_fullname office_fullname varchar(100) COMMENT '机构全称|机构完整层级路径';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'node_key') then 
			ALTER TABLE ST_OFFICE ADD node_key varchar(21);
		else 
			ALTER TABLE ST_OFFICE CHANGE node_key node_key varchar(21);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'office_code') then 
			ALTER TABLE ST_OFFICE ADD office_code varchar(20) COMMENT '机构代码';
		else 
			ALTER TABLE ST_OFFICE CHANGE office_code office_code varchar(20) COMMENT '机构代码';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'office_level_type') then 
			ALTER TABLE ST_OFFICE ADD office_level_type int COMMENT '机构级别类型|示例：0：集团；1：企业；2：一级部门；3：二级部门';
		else 
			ALTER TABLE ST_OFFICE CHANGE office_level_type office_level_type int COMMENT '机构级别类型|示例：0：集团；1：企业；2：一级部门；3：二级部门';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'office_type') then 
			ALTER TABLE ST_OFFICE ADD office_type int DEFAULT 0  COMMENT '机构类型|示例：0：内部机构；1：供应商机构；2：客户机构';
		else 
			ALTER TABLE ST_OFFICE CHANGE office_type office_type int DEFAULT 0  COMMENT '机构类型|示例：0：内部机构；1：供应商机构；2：客户机构';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'office_is_last_level') then 
			ALTER TABLE ST_OFFICE ADD office_is_last_level int DEFAULT 1  NOT NULL COMMENT '是否末级机构';
		else 
			ALTER TABLE ST_OFFICE CHANGE office_is_last_level office_is_last_level int DEFAULT 1  NOT NULL COMMENT '是否末级机构';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'office_hide') then 
			ALTER TABLE ST_OFFICE ADD office_hide int DEFAULT 0  NOT NULL COMMENT '禁用';
		else 
			ALTER TABLE ST_OFFICE CHANGE office_hide office_hide int DEFAULT 0  NOT NULL COMMENT '禁用';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'office1_id') then 
			ALTER TABLE ST_OFFICE ADD office1_id int COMMENT '1级机构ID';
		else 
			ALTER TABLE ST_OFFICE CHANGE office1_id office1_id int COMMENT '1级机构ID';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'office1_name') then 
			ALTER TABLE ST_OFFICE ADD office1_name varchar(30) COMMENT '1级机构名称';
		else 
			ALTER TABLE ST_OFFICE CHANGE office1_name office1_name varchar(30) COMMENT '1级机构名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'office2_id') then 
			ALTER TABLE ST_OFFICE ADD office2_id int;
		else 
			ALTER TABLE ST_OFFICE CHANGE office2_id office2_id int;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'office2_name') then 
			ALTER TABLE ST_OFFICE ADD office2_name varchar(30);
		else 
			ALTER TABLE ST_OFFICE CHANGE office2_name office2_name varchar(30);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'office3_id') then 
			ALTER TABLE ST_OFFICE ADD office3_id int;
		else 
			ALTER TABLE ST_OFFICE CHANGE office3_id office3_id int;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'office3_name') then 
			ALTER TABLE ST_OFFICE ADD office3_name varchar(30);
		else 
			ALTER TABLE ST_OFFICE CHANGE office3_name office3_name varchar(30);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'office_order') then 
			ALTER TABLE ST_OFFICE ADD office_order int DEFAULT 999  NOT NULL COMMENT '序号';
		else 
			ALTER TABLE ST_OFFICE CHANGE office_order office_order int DEFAULT 999  NOT NULL COMMENT '序号';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'office_full_order') then 
			ALTER TABLE ST_OFFICE ADD office_full_order varchar(27) COMMENT '全排列序号';
		else 
			ALTER TABLE ST_OFFICE CHANGE office_full_order office_full_order varchar(27) COMMENT '全排列序号';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'office_remark') then 
			ALTER TABLE ST_OFFICE ADD office_remark varchar(100) COMMENT '备注';
		else 
			ALTER TABLE ST_OFFICE CHANGE office_remark office_remark varchar(100) COMMENT '备注';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'creator') then 
			ALTER TABLE ST_OFFICE ADD creator varchar(20);
		else 
			ALTER TABLE ST_OFFICE CHANGE creator creator varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'cdate') then 
			ALTER TABLE ST_OFFICE ADD cdate datetime;
		else 
			ALTER TABLE ST_OFFICE CHANGE cdate cdate datetime;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'modifier') then 
			ALTER TABLE ST_OFFICE ADD modifier varchar(20);
		else 
			ALTER TABLE ST_OFFICE CHANGE modifier modifier varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'mdate') then 
			ALTER TABLE ST_OFFICE ADD mdate datetime;
		else 
			ALTER TABLE ST_OFFICE CHANGE mdate mdate datetime;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'deletor') then 
			ALTER TABLE ST_OFFICE ADD deletor varchar(20) COMMENT '删除人';
		else 
			ALTER TABLE ST_OFFICE CHANGE deletor deletor varchar(20) COMMENT '删除人';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'ddate') then 
			ALTER TABLE ST_OFFICE ADD ddate datetime COMMENT '删除时间';
		else 
			ALTER TABLE ST_OFFICE CHANGE ddate ddate datetime COMMENT '删除时间';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE' and COLUMN_NAME = 'del_tag') then 
			ALTER TABLE ST_OFFICE ADD del_tag int DEFAULT 0  NOT NULL COMMENT '删除标志';
		else 
			ALTER TABLE ST_OFFICE CHANGE del_tag del_tag int DEFAULT 0  NOT NULL COMMENT '删除标志';
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_OFFICE' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_OFFICE ADD PRIMARY KEY(office_id);
		end if;
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_OFFICE' and index_name = 'IX_ST_OFFICE_node_key') then 
			ALTER TABLE ST_OFFICE ADD UNIQUE INDEX IX_ST_OFFICE_node_key(node_key);
		end if;
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_OFFICE' and index_name = 'IX_ST_OFFICE_office1_id') then 
			ALTER TABLE ST_OFFICE ADD INDEX IX_ST_OFFICE_office1_id(office1_id);
		end if;
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_OFFICE' and index_name = 'IX_ST_OFFICE_office2_id') then 
			ALTER TABLE ST_OFFICE ADD INDEX IX_ST_OFFICE_office2_id(office2_id);
		end if;
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_OFFICE' and index_name = 'IX_ST_OFFICE_office3_id') then 
			ALTER TABLE ST_OFFICE ADD INDEX IX_ST_OFFICE_office3_id(office3_id);
		end if;
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_OFFICE' and index_name = 'IX_ST_OFFICE_poffice_id') then 
			ALTER TABLE ST_OFFICE ADD INDEX IX_ST_OFFICE_poffice_id(poffice_id);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_OFFICE_LEVEL_TYPE;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_OFFICE_LEVEL_TYPE') then	  
				CREATE TABLE ST_OFFICE_LEVEL_TYPE ( 
					office_level_type int DEFAULT 1  NOT NULL COMMENT '机构级别|用户自定义机构类别，示例：0：集团；1：企业；2：分公司、一级部门；3：二级部门',
					office_level_type_name varchar(30) NOT NULL COMMENT '机构级别名称'
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE_LEVEL_TYPE' and COLUMN_NAME = 'office_level_type') then 
			ALTER TABLE ST_OFFICE_LEVEL_TYPE ADD office_level_type int DEFAULT 1  NOT NULL COMMENT '机构级别|用户自定义机构类别，示例：0：集团；1：企业；2：分公司、一级部门；3：二级部门';
		else 
			ALTER TABLE ST_OFFICE_LEVEL_TYPE CHANGE office_level_type office_level_type int DEFAULT 1  NOT NULL COMMENT '机构级别|用户自定义机构类别，示例：0：集团；1：企业；2：分公司、一级部门；3：二级部门';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE_LEVEL_TYPE' and COLUMN_NAME = 'office_level_type_name') then 
			ALTER TABLE ST_OFFICE_LEVEL_TYPE ADD office_level_type_name varchar(30) NOT NULL COMMENT '机构级别名称';
		else 
			ALTER TABLE ST_OFFICE_LEVEL_TYPE CHANGE office_level_type_name office_level_type_name varchar(30) NOT NULL COMMENT '机构级别名称';
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_OFFICE_LEVEL_TYPE' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_OFFICE_LEVEL_TYPE ADD PRIMARY KEY(office_level_type);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_OFFICE_TYPE;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_OFFICE_TYPE') then	  
				CREATE TABLE ST_OFFICE_TYPE ( 
					office_type int DEFAULT 0  NOT NULL COMMENT '机构类别|用户自定义机构类别，示例：0：内部机构；6：供应商机构；7：客户机构',
					office_type_name varchar(30) NOT NULL COMMENT '机构类别名称'
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE_TYPE' and COLUMN_NAME = 'office_type') then 
			ALTER TABLE ST_OFFICE_TYPE ADD office_type int DEFAULT 0  NOT NULL COMMENT '机构类别|用户自定义机构类别，示例：0：内部机构；6：供应商机构；7：客户机构';
		else 
			ALTER TABLE ST_OFFICE_TYPE CHANGE office_type office_type int DEFAULT 0  NOT NULL COMMENT '机构类别|用户自定义机构类别，示例：0：内部机构；6：供应商机构；7：客户机构';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_OFFICE_TYPE' and COLUMN_NAME = 'office_type_name') then 
			ALTER TABLE ST_OFFICE_TYPE ADD office_type_name varchar(30) NOT NULL COMMENT '机构类别名称';
		else 
			ALTER TABLE ST_OFFICE_TYPE CHANGE office_type_name office_type_name varchar(30) NOT NULL COMMENT '机构类别名称';
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_OFFICE_TYPE' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_OFFICE_TYPE ADD PRIMARY KEY(office_type);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_PARAMETER;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_PARAMETER') then	  
				CREATE TABLE ST_PARAMETER ( 
					catalog_key varchar(20) NOT NULL COMMENT '参数类别标识|外键=ST_PARAMETER_CATALOG.catalog_key',
					parameter_key varchar(30) NOT NULL COMMENT '参数标识',
					parameter_name varchar(50) NOT NULL COMMENT '参数名称',
					parameter_type varchar(10) DEFAULT 'o'  NOT NULL COMMENT '参数类型|g：全局参数，e：企业参数，o：其它参数（不统一维护）',
					parameter_order int DEFAULT 999  NOT NULL COMMENT '序号',
					parameter_remark varchar(200) COMMENT '备注',
					creator varchar(20) NOT NULL,
					cdate datetime NOT NULL,
					modifier varchar(20),
					mdate datetime
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER' and COLUMN_NAME = 'catalog_key') then 
			ALTER TABLE ST_PARAMETER ADD catalog_key varchar(20) NOT NULL COMMENT '参数类别标识|外键=ST_PARAMETER_CATALOG.catalog_key';
		else 
			ALTER TABLE ST_PARAMETER CHANGE catalog_key catalog_key varchar(20) NOT NULL COMMENT '参数类别标识|外键=ST_PARAMETER_CATALOG.catalog_key';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER' and COLUMN_NAME = 'parameter_key') then 
			ALTER TABLE ST_PARAMETER ADD parameter_key varchar(30) NOT NULL COMMENT '参数标识';
		else 
			ALTER TABLE ST_PARAMETER CHANGE parameter_key parameter_key varchar(30) NOT NULL COMMENT '参数标识';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER' and COLUMN_NAME = 'parameter_name') then 
			ALTER TABLE ST_PARAMETER ADD parameter_name varchar(50) NOT NULL COMMENT '参数名称';
		else 
			ALTER TABLE ST_PARAMETER CHANGE parameter_name parameter_name varchar(50) NOT NULL COMMENT '参数名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER' and COLUMN_NAME = 'parameter_type') then 
			ALTER TABLE ST_PARAMETER ADD parameter_type varchar(10) DEFAULT 'o'  NOT NULL COMMENT '参数类型|g：全局参数，e：企业参数，o：其它参数（不统一维护）';
		else 
			ALTER TABLE ST_PARAMETER CHANGE parameter_type parameter_type varchar(10) DEFAULT 'o'  NOT NULL COMMENT '参数类型|g：全局参数，e：企业参数，o：其它参数（不统一维护）';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER' and COLUMN_NAME = 'parameter_order') then 
			ALTER TABLE ST_PARAMETER ADD parameter_order int DEFAULT 999  NOT NULL COMMENT '序号';
		else 
			ALTER TABLE ST_PARAMETER CHANGE parameter_order parameter_order int DEFAULT 999  NOT NULL COMMENT '序号';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER' and COLUMN_NAME = 'parameter_remark') then 
			ALTER TABLE ST_PARAMETER ADD parameter_remark varchar(200) COMMENT '备注';
		else 
			ALTER TABLE ST_PARAMETER CHANGE parameter_remark parameter_remark varchar(200) COMMENT '备注';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER' and COLUMN_NAME = 'creator') then 
			ALTER TABLE ST_PARAMETER ADD creator varchar(20) NOT NULL;
		else 
			ALTER TABLE ST_PARAMETER CHANGE creator creator varchar(20) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER' and COLUMN_NAME = 'cdate') then 
			ALTER TABLE ST_PARAMETER ADD cdate datetime NOT NULL;
		else 
			ALTER TABLE ST_PARAMETER CHANGE cdate cdate datetime NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER' and COLUMN_NAME = 'modifier') then 
			ALTER TABLE ST_PARAMETER ADD modifier varchar(20);
		else 
			ALTER TABLE ST_PARAMETER CHANGE modifier modifier varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER' and COLUMN_NAME = 'mdate') then 
			ALTER TABLE ST_PARAMETER ADD mdate datetime;
		else 
			ALTER TABLE ST_PARAMETER CHANGE mdate mdate datetime;
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_PARAMETER' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_PARAMETER ADD PRIMARY KEY(parameter_key);
		end if;
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_PARAMETER' and index_name = 'IX_ST_PARAMETER') then 
			ALTER TABLE ST_PARAMETER ADD INDEX IX_ST_PARAMETER(catalog_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_PARAMETER_CATALOG;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_PARAMETER_CATALOG') then	  
				CREATE TABLE ST_PARAMETER_CATALOG ( 
					catalog_key varchar(20) NOT NULL COMMENT '参数类别标识',
					catalog_name varchar(50) NOT NULL COMMENT '参数类别名称',
					catalog_order int DEFAULT 999  NOT NULL COMMENT '序号',
					catalog_remark varchar(100) COMMENT '备注',
					creator varchar(20) NOT NULL,
					cdate datetime NOT NULL,
					modifier varchar(20),
					mdate datetime
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER_CATALOG' and COLUMN_NAME = 'catalog_key') then 
			ALTER TABLE ST_PARAMETER_CATALOG ADD catalog_key varchar(20) NOT NULL COMMENT '参数类别标识';
		else 
			ALTER TABLE ST_PARAMETER_CATALOG CHANGE catalog_key catalog_key varchar(20) NOT NULL COMMENT '参数类别标识';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER_CATALOG' and COLUMN_NAME = 'catalog_name') then 
			ALTER TABLE ST_PARAMETER_CATALOG ADD catalog_name varchar(50) NOT NULL COMMENT '参数类别名称';
		else 
			ALTER TABLE ST_PARAMETER_CATALOG CHANGE catalog_name catalog_name varchar(50) NOT NULL COMMENT '参数类别名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER_CATALOG' and COLUMN_NAME = 'catalog_order') then 
			ALTER TABLE ST_PARAMETER_CATALOG ADD catalog_order int DEFAULT 999  NOT NULL COMMENT '序号';
		else 
			ALTER TABLE ST_PARAMETER_CATALOG CHANGE catalog_order catalog_order int DEFAULT 999  NOT NULL COMMENT '序号';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER_CATALOG' and COLUMN_NAME = 'catalog_remark') then 
			ALTER TABLE ST_PARAMETER_CATALOG ADD catalog_remark varchar(100) COMMENT '备注';
		else 
			ALTER TABLE ST_PARAMETER_CATALOG CHANGE catalog_remark catalog_remark varchar(100) COMMENT '备注';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER_CATALOG' and COLUMN_NAME = 'creator') then 
			ALTER TABLE ST_PARAMETER_CATALOG ADD creator varchar(20) NOT NULL;
		else 
			ALTER TABLE ST_PARAMETER_CATALOG CHANGE creator creator varchar(20) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER_CATALOG' and COLUMN_NAME = 'cdate') then 
			ALTER TABLE ST_PARAMETER_CATALOG ADD cdate datetime NOT NULL;
		else 
			ALTER TABLE ST_PARAMETER_CATALOG CHANGE cdate cdate datetime NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER_CATALOG' and COLUMN_NAME = 'modifier') then 
			ALTER TABLE ST_PARAMETER_CATALOG ADD modifier varchar(20);
		else 
			ALTER TABLE ST_PARAMETER_CATALOG CHANGE modifier modifier varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER_CATALOG' and COLUMN_NAME = 'mdate') then 
			ALTER TABLE ST_PARAMETER_CATALOG ADD mdate datetime;
		else 
			ALTER TABLE ST_PARAMETER_CATALOG CHANGE mdate mdate datetime;
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_PARAMETER_CATALOG' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_PARAMETER_CATALOG ADD PRIMARY KEY(catalog_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_PARAMETER_VALUE;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_PARAMETER_VALUE') then	  
				CREATE TABLE ST_PARAMETER_VALUE ( 
					eoid int NOT NULL COMMENT '企业ID',
					parameter_key varchar(30) NOT NULL COMMENT '参数标识',
					parameter_value_id int AUTO_INCREMENT NOT NULL COMMENT '主键',
					parameter_value varchar(50) NOT NULL COMMENT '参数值',
					parameter_value1 varchar(50) COMMENT '参数值1',
					parameter_value2 varchar(50) COMMENT '参数值2',
					parameter_value3 varchar(50) COMMENT '参数值3',
					parameter_value_order int DEFAULT 999  NOT NULL COMMENT '序号',
					parameter_value_remark varchar(100) COMMENT '备注',
					creator varchar(20) NOT NULL,
					cdate datetime NOT NULL,
					modifier varchar(20),
					mdate datetime
				  ,  PRIMARY KEY (parameter_value_id)
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER_VALUE' and COLUMN_NAME = 'eoid') then 
			ALTER TABLE ST_PARAMETER_VALUE ADD eoid int NOT NULL COMMENT '企业ID';
		else 
			ALTER TABLE ST_PARAMETER_VALUE CHANGE eoid eoid int NOT NULL COMMENT '企业ID';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER_VALUE' and COLUMN_NAME = 'parameter_key') then 
			ALTER TABLE ST_PARAMETER_VALUE ADD parameter_key varchar(30) NOT NULL COMMENT '参数标识';
		else 
			ALTER TABLE ST_PARAMETER_VALUE CHANGE parameter_key parameter_key varchar(30) NOT NULL COMMENT '参数标识';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER_VALUE' and COLUMN_NAME = 'parameter_value_id') then 
			ALTER TABLE ST_PARAMETER_VALUE ADD parameter_value_id int AUTO_INCREMENT NOT NULL COMMENT '主键';
		else 
			ALTER TABLE ST_PARAMETER_VALUE CHANGE parameter_value_id parameter_value_id int AUTO_INCREMENT NOT NULL COMMENT '主键';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER_VALUE' and COLUMN_NAME = 'parameter_value') then 
			ALTER TABLE ST_PARAMETER_VALUE ADD parameter_value varchar(50) NOT NULL COMMENT '参数值';
		else 
			ALTER TABLE ST_PARAMETER_VALUE CHANGE parameter_value parameter_value varchar(50) NOT NULL COMMENT '参数值';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER_VALUE' and COLUMN_NAME = 'parameter_value1') then 
			ALTER TABLE ST_PARAMETER_VALUE ADD parameter_value1 varchar(50) COMMENT '参数值1';
		else 
			ALTER TABLE ST_PARAMETER_VALUE CHANGE parameter_value1 parameter_value1 varchar(50) COMMENT '参数值1';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER_VALUE' and COLUMN_NAME = 'parameter_value2') then 
			ALTER TABLE ST_PARAMETER_VALUE ADD parameter_value2 varchar(50) COMMENT '参数值2';
		else 
			ALTER TABLE ST_PARAMETER_VALUE CHANGE parameter_value2 parameter_value2 varchar(50) COMMENT '参数值2';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER_VALUE' and COLUMN_NAME = 'parameter_value3') then 
			ALTER TABLE ST_PARAMETER_VALUE ADD parameter_value3 varchar(50) COMMENT '参数值3';
		else 
			ALTER TABLE ST_PARAMETER_VALUE CHANGE parameter_value3 parameter_value3 varchar(50) COMMENT '参数值3';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER_VALUE' and COLUMN_NAME = 'parameter_value_order') then 
			ALTER TABLE ST_PARAMETER_VALUE ADD parameter_value_order int DEFAULT 999  NOT NULL COMMENT '序号';
		else 
			ALTER TABLE ST_PARAMETER_VALUE CHANGE parameter_value_order parameter_value_order int DEFAULT 999  NOT NULL COMMENT '序号';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER_VALUE' and COLUMN_NAME = 'parameter_value_remark') then 
			ALTER TABLE ST_PARAMETER_VALUE ADD parameter_value_remark varchar(100) COMMENT '备注';
		else 
			ALTER TABLE ST_PARAMETER_VALUE CHANGE parameter_value_remark parameter_value_remark varchar(100) COMMENT '备注';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER_VALUE' and COLUMN_NAME = 'creator') then 
			ALTER TABLE ST_PARAMETER_VALUE ADD creator varchar(20) NOT NULL;
		else 
			ALTER TABLE ST_PARAMETER_VALUE CHANGE creator creator varchar(20) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER_VALUE' and COLUMN_NAME = 'cdate') then 
			ALTER TABLE ST_PARAMETER_VALUE ADD cdate datetime NOT NULL;
		else 
			ALTER TABLE ST_PARAMETER_VALUE CHANGE cdate cdate datetime NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER_VALUE' and COLUMN_NAME = 'modifier') then 
			ALTER TABLE ST_PARAMETER_VALUE ADD modifier varchar(20);
		else 
			ALTER TABLE ST_PARAMETER_VALUE CHANGE modifier modifier varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_PARAMETER_VALUE' and COLUMN_NAME = 'mdate') then 
			ALTER TABLE ST_PARAMETER_VALUE ADD mdate datetime;
		else 
			ALTER TABLE ST_PARAMETER_VALUE CHANGE mdate mdate datetime;
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_PARAMETER_VALUE' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_PARAMETER_VALUE ADD PRIMARY KEY(parameter_value_id);
		end if;
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_PARAMETER_VALUE' and index_name = 'IX_ST_PARAMETER_VALUE') then 
			ALTER TABLE ST_PARAMETER_VALUE ADD UNIQUE INDEX IX_ST_PARAMETER_VALUE(parameter_value,eoid,parameter_key);
		end if;
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_PARAMETER_VALUE' and index_name = 'IX_ST_PARAMETER_VALUE_1') then 
			ALTER TABLE ST_PARAMETER_VALUE ADD INDEX IX_ST_PARAMETER_VALUE_1(parameter_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_REPORT;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_REPORT') then	  
				CREATE TABLE ST_REPORT ( 
					system_key varchar(20) NOT NULL,
					report_key varchar(50) NOT NULL COMMENT '报表标识',
					database_key varchar(20) NOT NULL COMMENT '逻辑数据库',
					report_title varchar(50) NOT NULL COMMENT '报表标题',
					report_type int DEFAULT 1  NOT NULL COMMENT '报表类型|1：汇总表，0：明细表',
					report_data_source_type varchar(10) DEFAULT 'sql'  NOT NULL COMMENT '数据源类型|sql，st_view',
					report_data_source varchar(1024) NOT NULL COMMENT '数据源|sql：SQL语句，st_view：数据视图',
					report_sum_count int DEFAULT 0  NOT NULL COMMENT '行合计层数|-1：无合计；0：仅总计；1：分计；2：小计...',
					report_bottom varchar(50) COMMENT '报表脚注',
					report_paper_type varchar(20) DEFAULT 'A4'  COMMENT '纸张类型',
					report_remark varchar(200) COMMENT '备注说明',
					creator varchar(30) COMMENT '创建者',
					cdate datetime COMMENT '创建时间',
					modifier varchar(30) COMMENT '最后修改人',
					mdate datetime COMMENT '最后修改时间'
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT' and COLUMN_NAME = 'system_key') then 
			ALTER TABLE ST_REPORT ADD system_key varchar(20) NOT NULL;
		else 
			ALTER TABLE ST_REPORT CHANGE system_key system_key varchar(20) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT' and COLUMN_NAME = 'report_key') then 
			ALTER TABLE ST_REPORT ADD report_key varchar(50) NOT NULL COMMENT '报表标识';
		else 
			ALTER TABLE ST_REPORT CHANGE report_key report_key varchar(50) NOT NULL COMMENT '报表标识';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT' and COLUMN_NAME = 'database_key') then 
			ALTER TABLE ST_REPORT ADD database_key varchar(20) NOT NULL COMMENT '逻辑数据库';
		else 
			ALTER TABLE ST_REPORT CHANGE database_key database_key varchar(20) NOT NULL COMMENT '逻辑数据库';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT' and COLUMN_NAME = 'report_title') then 
			ALTER TABLE ST_REPORT ADD report_title varchar(50) NOT NULL COMMENT '报表标题';
		else 
			ALTER TABLE ST_REPORT CHANGE report_title report_title varchar(50) NOT NULL COMMENT '报表标题';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT' and COLUMN_NAME = 'report_type') then 
			ALTER TABLE ST_REPORT ADD report_type int DEFAULT 1  NOT NULL COMMENT '报表类型|1：汇总表，0：明细表';
		else 
			ALTER TABLE ST_REPORT CHANGE report_type report_type int DEFAULT 1  NOT NULL COMMENT '报表类型|1：汇总表，0：明细表';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT' and COLUMN_NAME = 'report_data_source_type') then 
			ALTER TABLE ST_REPORT ADD report_data_source_type varchar(10) DEFAULT 'sql'  NOT NULL COMMENT '数据源类型|sql，st_view';
		else 
			ALTER TABLE ST_REPORT CHANGE report_data_source_type report_data_source_type varchar(10) DEFAULT 'sql'  NOT NULL COMMENT '数据源类型|sql，st_view';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT' and COLUMN_NAME = 'report_data_source') then 
			ALTER TABLE ST_REPORT ADD report_data_source varchar(1024) NOT NULL COMMENT '数据源|sql：SQL语句，st_view：数据视图';
		else 
			ALTER TABLE ST_REPORT CHANGE report_data_source report_data_source varchar(1024) NOT NULL COMMENT '数据源|sql：SQL语句，st_view：数据视图';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT' and COLUMN_NAME = 'report_sum_count') then 
			ALTER TABLE ST_REPORT ADD report_sum_count int DEFAULT 0  NOT NULL COMMENT '行合计层数|-1：无合计；0：仅总计；1：分计；2：小计...';
		else 
			ALTER TABLE ST_REPORT CHANGE report_sum_count report_sum_count int DEFAULT 0  NOT NULL COMMENT '行合计层数|-1：无合计；0：仅总计；1：分计；2：小计...';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT' and COLUMN_NAME = 'report_bottom') then 
			ALTER TABLE ST_REPORT ADD report_bottom varchar(50) COMMENT '报表脚注';
		else 
			ALTER TABLE ST_REPORT CHANGE report_bottom report_bottom varchar(50) COMMENT '报表脚注';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT' and COLUMN_NAME = 'report_paper_type') then 
			ALTER TABLE ST_REPORT ADD report_paper_type varchar(20) DEFAULT 'A4'  COMMENT '纸张类型';
		else 
			ALTER TABLE ST_REPORT CHANGE report_paper_type report_paper_type varchar(20) DEFAULT 'A4'  COMMENT '纸张类型';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT' and COLUMN_NAME = 'report_remark') then 
			ALTER TABLE ST_REPORT ADD report_remark varchar(200) COMMENT '备注说明';
		else 
			ALTER TABLE ST_REPORT CHANGE report_remark report_remark varchar(200) COMMENT '备注说明';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT' and COLUMN_NAME = 'creator') then 
			ALTER TABLE ST_REPORT ADD creator varchar(30) COMMENT '创建者';
		else 
			ALTER TABLE ST_REPORT CHANGE creator creator varchar(30) COMMENT '创建者';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT' and COLUMN_NAME = 'cdate') then 
			ALTER TABLE ST_REPORT ADD cdate datetime COMMENT '创建时间';
		else 
			ALTER TABLE ST_REPORT CHANGE cdate cdate datetime COMMENT '创建时间';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT' and COLUMN_NAME = 'modifier') then 
			ALTER TABLE ST_REPORT ADD modifier varchar(30) COMMENT '最后修改人';
		else 
			ALTER TABLE ST_REPORT CHANGE modifier modifier varchar(30) COMMENT '最后修改人';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT' and COLUMN_NAME = 'mdate') then 
			ALTER TABLE ST_REPORT ADD mdate datetime COMMENT '最后修改时间';
		else 
			ALTER TABLE ST_REPORT CHANGE mdate mdate datetime COMMENT '最后修改时间';
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_REPORT' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_REPORT ADD PRIMARY KEY(report_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_REPORT_COLUMN;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_REPORT_COLUMN') then	  
				CREATE TABLE ST_REPORT_COLUMN ( 
					report_key varchar(50) NOT NULL COMMENT '报表名称',
					report_column_key varchar(30) NOT NULL COMMENT '显示字段标识',
					rc_under_key varchar(30) COMMENT '底层字段标识|显示为中文值，底层实际为关键字字段值',
					rc_sort_key varchar(30) COMMENT '排序字段标识',
					rc_name varchar(30) NOT NULL COMMENT '字段名称',
					rc_rdc_type varchar(3) DEFAULT 'RDC'  NOT NULL COMMENT '允许配置的区域类型|R：行分组区，D：数据区，C：列分组区',
					rc_rdc varchar(1) NOT NULL COMMENT '区域位置',
					rc_index int DEFAULT 0  NOT NULL COMMENT '序号|从左到右，从上到下',
					rc_selected int DEFAULT 0  NOT NULL COMMENT '输出标志',
					rc_fieldtype varchar(20) NOT NULL COMMENT '字段类型|string、number、datetime等',
					rc_datatype varchar(20) DEFAULT 'String'  NOT NULL COMMENT '数据类型|varchar、int、float等',
					rc_is_formula_col int DEFAULT 0  NOT NULL COMMENT '是否公式列|1：是；0：否',
					rc_formula varchar(200) COMMENT '单元格列公式表达式|后缀表达式(e.g. =,/,金额,数量)或常量',
					rc_formula_row varchar(20) COMMENT '行分组组公式|sum、AVERAGE、count',
					rc_formula_col varchar(20) COMMENT '列分组组公式|sum、avg、count',
					rc_formula_col_count int DEFAULT -1  COMMENT '列公式层数|当前字段列公式层数，-1：不合计；0：仅总计；1：分计；2：小计...',
					rc_formula_row_col varchar(1) COMMENT '行列分组交叉单元格公式|R：行公式；C：列公式；N：无公式',
					rc_width int DEFAULT 80  COMMENT '字段宽度',
					rc_format varchar(20) COMMENT '显示格式',
					rc_format_xls varchar(20) COMMENT 'Excel显示格式',
					rc_allow_config int DEFAULT 1  NOT NULL COMMENT '允许配置|例如：ID列，排序列等不允许配置，不显示在配置界面上'
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT_COLUMN' and COLUMN_NAME = 'report_key') then 
			ALTER TABLE ST_REPORT_COLUMN ADD report_key varchar(50) NOT NULL COMMENT '报表名称';
		else 
			ALTER TABLE ST_REPORT_COLUMN CHANGE report_key report_key varchar(50) NOT NULL COMMENT '报表名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT_COLUMN' and COLUMN_NAME = 'report_column_key') then 
			ALTER TABLE ST_REPORT_COLUMN ADD report_column_key varchar(30) NOT NULL COMMENT '显示字段标识';
		else 
			ALTER TABLE ST_REPORT_COLUMN CHANGE report_column_key report_column_key varchar(30) NOT NULL COMMENT '显示字段标识';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT_COLUMN' and COLUMN_NAME = 'rc_under_key') then 
			ALTER TABLE ST_REPORT_COLUMN ADD rc_under_key varchar(30) COMMENT '底层字段标识|显示为中文值，底层实际为关键字字段值';
		else 
			ALTER TABLE ST_REPORT_COLUMN CHANGE rc_under_key rc_under_key varchar(30) COMMENT '底层字段标识|显示为中文值，底层实际为关键字字段值';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT_COLUMN' and COLUMN_NAME = 'rc_sort_key') then 
			ALTER TABLE ST_REPORT_COLUMN ADD rc_sort_key varchar(30) COMMENT '排序字段标识';
		else 
			ALTER TABLE ST_REPORT_COLUMN CHANGE rc_sort_key rc_sort_key varchar(30) COMMENT '排序字段标识';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT_COLUMN' and COLUMN_NAME = 'rc_name') then 
			ALTER TABLE ST_REPORT_COLUMN ADD rc_name varchar(30) NOT NULL COMMENT '字段名称';
		else 
			ALTER TABLE ST_REPORT_COLUMN CHANGE rc_name rc_name varchar(30) NOT NULL COMMENT '字段名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT_COLUMN' and COLUMN_NAME = 'rc_rdc_type') then 
			ALTER TABLE ST_REPORT_COLUMN ADD rc_rdc_type varchar(3) DEFAULT 'RDC'  NOT NULL COMMENT '允许配置的区域类型|R：行分组区，D：数据区，C：列分组区';
		else 
			ALTER TABLE ST_REPORT_COLUMN CHANGE rc_rdc_type rc_rdc_type varchar(3) DEFAULT 'RDC'  NOT NULL COMMENT '允许配置的区域类型|R：行分组区，D：数据区，C：列分组区';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT_COLUMN' and COLUMN_NAME = 'rc_rdc') then 
			ALTER TABLE ST_REPORT_COLUMN ADD rc_rdc varchar(1) NOT NULL COMMENT '区域位置';
		else 
			ALTER TABLE ST_REPORT_COLUMN CHANGE rc_rdc rc_rdc varchar(1) NOT NULL COMMENT '区域位置';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT_COLUMN' and COLUMN_NAME = 'rc_index') then 
			ALTER TABLE ST_REPORT_COLUMN ADD rc_index int DEFAULT 0  NOT NULL COMMENT '序号|从左到右，从上到下';
		else 
			ALTER TABLE ST_REPORT_COLUMN CHANGE rc_index rc_index int DEFAULT 0  NOT NULL COMMENT '序号|从左到右，从上到下';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT_COLUMN' and COLUMN_NAME = 'rc_selected') then 
			ALTER TABLE ST_REPORT_COLUMN ADD rc_selected int DEFAULT 0  NOT NULL COMMENT '输出标志';
		else 
			ALTER TABLE ST_REPORT_COLUMN CHANGE rc_selected rc_selected int DEFAULT 0  NOT NULL COMMENT '输出标志';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT_COLUMN' and COLUMN_NAME = 'rc_fieldtype') then 
			ALTER TABLE ST_REPORT_COLUMN ADD rc_fieldtype varchar(20) NOT NULL COMMENT '字段类型|string、number、datetime等';
		else 
			ALTER TABLE ST_REPORT_COLUMN CHANGE rc_fieldtype rc_fieldtype varchar(20) NOT NULL COMMENT '字段类型|string、number、datetime等';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT_COLUMN' and COLUMN_NAME = 'rc_datatype') then 
			ALTER TABLE ST_REPORT_COLUMN ADD rc_datatype varchar(20) DEFAULT 'String'  NOT NULL COMMENT '数据类型|varchar、int、float等';
		else 
			ALTER TABLE ST_REPORT_COLUMN CHANGE rc_datatype rc_datatype varchar(20) DEFAULT 'String'  NOT NULL COMMENT '数据类型|varchar、int、float等';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT_COLUMN' and COLUMN_NAME = 'rc_is_formula_col') then 
			ALTER TABLE ST_REPORT_COLUMN ADD rc_is_formula_col int DEFAULT 0  NOT NULL COMMENT '是否公式列|1：是；0：否';
		else 
			ALTER TABLE ST_REPORT_COLUMN CHANGE rc_is_formula_col rc_is_formula_col int DEFAULT 0  NOT NULL COMMENT '是否公式列|1：是；0：否';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT_COLUMN' and COLUMN_NAME = 'rc_formula') then 
			ALTER TABLE ST_REPORT_COLUMN ADD rc_formula varchar(200) COMMENT '单元格列公式表达式|后缀表达式(e.g. =,/,金额,数量)或常量';
		else 
			ALTER TABLE ST_REPORT_COLUMN CHANGE rc_formula rc_formula varchar(200) COMMENT '单元格列公式表达式|后缀表达式(e.g. =,/,金额,数量)或常量';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT_COLUMN' and COLUMN_NAME = 'rc_formula_row') then 
			ALTER TABLE ST_REPORT_COLUMN ADD rc_formula_row varchar(20) COMMENT '行分组组公式|sum、AVERAGE、count';
		else 
			ALTER TABLE ST_REPORT_COLUMN CHANGE rc_formula_row rc_formula_row varchar(20) COMMENT '行分组组公式|sum、AVERAGE、count';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT_COLUMN' and COLUMN_NAME = 'rc_formula_col') then 
			ALTER TABLE ST_REPORT_COLUMN ADD rc_formula_col varchar(20) COMMENT '列分组组公式|sum、avg、count';
		else 
			ALTER TABLE ST_REPORT_COLUMN CHANGE rc_formula_col rc_formula_col varchar(20) COMMENT '列分组组公式|sum、avg、count';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT_COLUMN' and COLUMN_NAME = 'rc_formula_col_count') then 
			ALTER TABLE ST_REPORT_COLUMN ADD rc_formula_col_count int DEFAULT -1  COMMENT '列公式层数|当前字段列公式层数，-1：不合计；0：仅总计；1：分计；2：小计...';
		else 
			ALTER TABLE ST_REPORT_COLUMN CHANGE rc_formula_col_count rc_formula_col_count int DEFAULT -1  COMMENT '列公式层数|当前字段列公式层数，-1：不合计；0：仅总计；1：分计；2：小计...';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT_COLUMN' and COLUMN_NAME = 'rc_formula_row_col') then 
			ALTER TABLE ST_REPORT_COLUMN ADD rc_formula_row_col varchar(1) COMMENT '行列分组交叉单元格公式|R：行公式；C：列公式；N：无公式';
		else 
			ALTER TABLE ST_REPORT_COLUMN CHANGE rc_formula_row_col rc_formula_row_col varchar(1) COMMENT '行列分组交叉单元格公式|R：行公式；C：列公式；N：无公式';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT_COLUMN' and COLUMN_NAME = 'rc_width') then 
			ALTER TABLE ST_REPORT_COLUMN ADD rc_width int DEFAULT 80  COMMENT '字段宽度';
		else 
			ALTER TABLE ST_REPORT_COLUMN CHANGE rc_width rc_width int DEFAULT 80  COMMENT '字段宽度';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT_COLUMN' and COLUMN_NAME = 'rc_format') then 
			ALTER TABLE ST_REPORT_COLUMN ADD rc_format varchar(20) COMMENT '显示格式';
		else 
			ALTER TABLE ST_REPORT_COLUMN CHANGE rc_format rc_format varchar(20) COMMENT '显示格式';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT_COLUMN' and COLUMN_NAME = 'rc_format_xls') then 
			ALTER TABLE ST_REPORT_COLUMN ADD rc_format_xls varchar(20) COMMENT 'Excel显示格式';
		else 
			ALTER TABLE ST_REPORT_COLUMN CHANGE rc_format_xls rc_format_xls varchar(20) COMMENT 'Excel显示格式';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_REPORT_COLUMN' and COLUMN_NAME = 'rc_allow_config') then 
			ALTER TABLE ST_REPORT_COLUMN ADD rc_allow_config int DEFAULT 1  NOT NULL COMMENT '允许配置|例如：ID列，排序列等不允许配置，不显示在配置界面上';
		else 
			ALTER TABLE ST_REPORT_COLUMN CHANGE rc_allow_config rc_allow_config int DEFAULT 1  NOT NULL COMMENT '允许配置|例如：ID列，排序列等不允许配置，不显示在配置界面上';
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_REPORT_COLUMN' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_REPORT_COLUMN ADD PRIMARY KEY(report_column_key,report_key);
		end if;
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_REPORT_COLUMN' and index_name = 'IX_ST_REPORT_COLUMN_report_key') then 
			ALTER TABLE ST_REPORT_COLUMN ADD INDEX IX_ST_REPORT_COLUMN_report_key(report_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_SYS_PARA;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_SYS_PARA') then	  
				CREATE TABLE ST_SYS_PARA ( 
					sys_para_key varchar(30) NOT NULL COMMENT '参数标识',
					sys_para_name varchar(30) NOT NULL COMMENT '参数名称',
					sys_para_value varchar(50) NOT NULL COMMENT '参数值',
					sys_para_remark varchar(200) COMMENT '备注'
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_SYS_PARA' and COLUMN_NAME = 'sys_para_key') then 
			ALTER TABLE ST_SYS_PARA ADD sys_para_key varchar(30) NOT NULL COMMENT '参数标识';
		else 
			ALTER TABLE ST_SYS_PARA CHANGE sys_para_key sys_para_key varchar(30) NOT NULL COMMENT '参数标识';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_SYS_PARA' and COLUMN_NAME = 'sys_para_name') then 
			ALTER TABLE ST_SYS_PARA ADD sys_para_name varchar(30) NOT NULL COMMENT '参数名称';
		else 
			ALTER TABLE ST_SYS_PARA CHANGE sys_para_name sys_para_name varchar(30) NOT NULL COMMENT '参数名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_SYS_PARA' and COLUMN_NAME = 'sys_para_value') then 
			ALTER TABLE ST_SYS_PARA ADD sys_para_value varchar(50) NOT NULL COMMENT '参数值';
		else 
			ALTER TABLE ST_SYS_PARA CHANGE sys_para_value sys_para_value varchar(50) NOT NULL COMMENT '参数值';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_SYS_PARA' and COLUMN_NAME = 'sys_para_remark') then 
			ALTER TABLE ST_SYS_PARA ADD sys_para_remark varchar(200) COMMENT '备注';
		else 
			ALTER TABLE ST_SYS_PARA CHANGE sys_para_remark sys_para_remark varchar(200) COMMENT '备注';
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_SYS_PARA' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_SYS_PARA ADD PRIMARY KEY(sys_para_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_SYSTEM;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_SYSTEM') then	  
				CREATE TABLE ST_SYSTEM ( 
					database_key varchar(20) NOT NULL COMMENT '默认数据库|逻辑数据库名称',
					system_key varchar(3) NOT NULL COMMENT '子系统key值|多客户用多个系统库进行区分',
					system_name varchar(20) NOT NULL COMMENT '子系统名称|前台子系统根目录',
					system_package varchar(30) COMMENT '子系统类包|后台子系统根目录，默认值同system_name',
					system_text varchar(20) NOT NULL COMMENT '系统简称|子系统标签显示的名称',
					system_version int DEFAULT 0  NOT NULL COMMENT '子系统版本',
					system_hide int DEFAULT 0  NOT NULL COMMENT '是否隐藏|0：显示，1：隐藏',
					system_order int DEFAULT 999  NOT NULL COMMENT '系统排列顺序',
					system_remark varchar(200),
					creator varchar(20) NOT NULL,
					cdate datetime NOT NULL,
					modifier varchar(20),
					mdate datetime
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_SYSTEM' and COLUMN_NAME = 'database_key') then 
			ALTER TABLE ST_SYSTEM ADD database_key varchar(20) NOT NULL COMMENT '默认数据库|逻辑数据库名称';
		else 
			ALTER TABLE ST_SYSTEM CHANGE database_key database_key varchar(20) NOT NULL COMMENT '默认数据库|逻辑数据库名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_SYSTEM' and COLUMN_NAME = 'system_key') then 
			ALTER TABLE ST_SYSTEM ADD system_key varchar(3) NOT NULL COMMENT '子系统key值|多客户用多个系统库进行区分';
		else 
			ALTER TABLE ST_SYSTEM CHANGE system_key system_key varchar(3) NOT NULL COMMENT '子系统key值|多客户用多个系统库进行区分';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_SYSTEM' and COLUMN_NAME = 'system_name') then 
			ALTER TABLE ST_SYSTEM ADD system_name varchar(20) NOT NULL COMMENT '子系统名称|前台子系统根目录';
		else 
			ALTER TABLE ST_SYSTEM CHANGE system_name system_name varchar(20) NOT NULL COMMENT '子系统名称|前台子系统根目录';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_SYSTEM' and COLUMN_NAME = 'system_package') then 
			ALTER TABLE ST_SYSTEM ADD system_package varchar(30) COMMENT '子系统类包|后台子系统根目录，默认值同system_name';
		else 
			ALTER TABLE ST_SYSTEM CHANGE system_package system_package varchar(30) COMMENT '子系统类包|后台子系统根目录，默认值同system_name';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_SYSTEM' and COLUMN_NAME = 'system_text') then 
			ALTER TABLE ST_SYSTEM ADD system_text varchar(20) NOT NULL COMMENT '系统简称|子系统标签显示的名称';
		else 
			ALTER TABLE ST_SYSTEM CHANGE system_text system_text varchar(20) NOT NULL COMMENT '系统简称|子系统标签显示的名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_SYSTEM' and COLUMN_NAME = 'system_version') then 
			ALTER TABLE ST_SYSTEM ADD system_version int DEFAULT 0  NOT NULL COMMENT '子系统版本';
		else 
			ALTER TABLE ST_SYSTEM CHANGE system_version system_version int DEFAULT 0  NOT NULL COMMENT '子系统版本';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_SYSTEM' and COLUMN_NAME = 'system_hide') then 
			ALTER TABLE ST_SYSTEM ADD system_hide int DEFAULT 0  NOT NULL COMMENT '是否隐藏|0：显示，1：隐藏';
		else 
			ALTER TABLE ST_SYSTEM CHANGE system_hide system_hide int DEFAULT 0  NOT NULL COMMENT '是否隐藏|0：显示，1：隐藏';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_SYSTEM' and COLUMN_NAME = 'system_order') then 
			ALTER TABLE ST_SYSTEM ADD system_order int DEFAULT 999  NOT NULL COMMENT '系统排列顺序';
		else 
			ALTER TABLE ST_SYSTEM CHANGE system_order system_order int DEFAULT 999  NOT NULL COMMENT '系统排列顺序';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_SYSTEM' and COLUMN_NAME = 'system_remark') then 
			ALTER TABLE ST_SYSTEM ADD system_remark varchar(200);
		else 
			ALTER TABLE ST_SYSTEM CHANGE system_remark system_remark varchar(200);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_SYSTEM' and COLUMN_NAME = 'creator') then 
			ALTER TABLE ST_SYSTEM ADD creator varchar(20) NOT NULL;
		else 
			ALTER TABLE ST_SYSTEM CHANGE creator creator varchar(20) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_SYSTEM' and COLUMN_NAME = 'cdate') then 
			ALTER TABLE ST_SYSTEM ADD cdate datetime NOT NULL;
		else 
			ALTER TABLE ST_SYSTEM CHANGE cdate cdate datetime NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_SYSTEM' and COLUMN_NAME = 'modifier') then 
			ALTER TABLE ST_SYSTEM ADD modifier varchar(20);
		else 
			ALTER TABLE ST_SYSTEM CHANGE modifier modifier varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_SYSTEM' and COLUMN_NAME = 'mdate') then 
			ALTER TABLE ST_SYSTEM ADD mdate datetime;
		else 
			ALTER TABLE ST_SYSTEM CHANGE mdate mdate datetime;
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_SYSTEM' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_SYSTEM ADD PRIMARY KEY(system_key);
		end if;
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_SYSTEM' and index_name = 'IX_ST_SYSTEM_name') then 
			ALTER TABLE ST_SYSTEM ADD UNIQUE INDEX IX_ST_SYSTEM_name(system_name);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_TABLE;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_TABLE') then	  
				CREATE TABLE ST_TABLE ( 
					database_key varchar(20),
					table_key varchar(52) NOT NULL,
					table_name varchar(30) NOT NULL COMMENT '对象物理名称',
					table_type varchar(1) DEFAULT 'U'  COMMENT '对象类型|U：表，V：视图',
					table_text varchar(30) COMMENT '对象中文名称',
					table_remark varchar(200),
					creator varchar(20),
					cdate datetime,
					modifier varchar(20),
					mdate datetime
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TABLE' and COLUMN_NAME = 'database_key') then 
			ALTER TABLE ST_TABLE ADD database_key varchar(20);
		else 
			ALTER TABLE ST_TABLE CHANGE database_key database_key varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TABLE' and COLUMN_NAME = 'table_key') then 
			ALTER TABLE ST_TABLE ADD table_key varchar(52) NOT NULL;
		else 
			ALTER TABLE ST_TABLE CHANGE table_key table_key varchar(52) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TABLE' and COLUMN_NAME = 'table_name') then 
			ALTER TABLE ST_TABLE ADD table_name varchar(30) NOT NULL COMMENT '对象物理名称';
		else 
			ALTER TABLE ST_TABLE CHANGE table_name table_name varchar(30) NOT NULL COMMENT '对象物理名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TABLE' and COLUMN_NAME = 'table_type') then 
			ALTER TABLE ST_TABLE ADD table_type varchar(1) DEFAULT 'U'  COMMENT '对象类型|U：表，V：视图';
		else 
			ALTER TABLE ST_TABLE CHANGE table_type table_type varchar(1) DEFAULT 'U'  COMMENT '对象类型|U：表，V：视图';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TABLE' and COLUMN_NAME = 'table_text') then 
			ALTER TABLE ST_TABLE ADD table_text varchar(30) COMMENT '对象中文名称';
		else 
			ALTER TABLE ST_TABLE CHANGE table_text table_text varchar(30) COMMENT '对象中文名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TABLE' and COLUMN_NAME = 'table_remark') then 
			ALTER TABLE ST_TABLE ADD table_remark varchar(200);
		else 
			ALTER TABLE ST_TABLE CHANGE table_remark table_remark varchar(200);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TABLE' and COLUMN_NAME = 'creator') then 
			ALTER TABLE ST_TABLE ADD creator varchar(20);
		else 
			ALTER TABLE ST_TABLE CHANGE creator creator varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TABLE' and COLUMN_NAME = 'cdate') then 
			ALTER TABLE ST_TABLE ADD cdate datetime;
		else 
			ALTER TABLE ST_TABLE CHANGE cdate cdate datetime;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TABLE' and COLUMN_NAME = 'modifier') then 
			ALTER TABLE ST_TABLE ADD modifier varchar(20);
		else 
			ALTER TABLE ST_TABLE CHANGE modifier modifier varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TABLE' and COLUMN_NAME = 'mdate') then 
			ALTER TABLE ST_TABLE ADD mdate datetime;
		else 
			ALTER TABLE ST_TABLE CHANGE mdate mdate datetime;
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_TABLE' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_TABLE ADD PRIMARY KEY(table_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_TREE;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_TREE') then	  
				CREATE TABLE ST_TREE ( 
					database_key varchar(20) NOT NULL,
					tree_key varchar(30) NOT NULL,
					tree_name varchar(30) NOT NULL COMMENT '树名称',
					tree_root_where varchar(256) COMMENT '根节点时的视图条件|一般为空，即显示全部数据，也可以设置为不显示任何数据',
					tree_first_node_value varchar(30) COMMENT '根节点条件|例如：机构树为循环节点，首节点为当前用户所在机构。',
					tree_auto_expand int DEFAULT 0  NOT NULL COMMENT '是否自动展开第一级',
					tree_remark varchar(200),
					creator varchar(20),
					cdate datetime,
					modifier varchar(20),
					mdate datetime
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TREE' and COLUMN_NAME = 'database_key') then 
			ALTER TABLE ST_TREE ADD database_key varchar(20) NOT NULL;
		else 
			ALTER TABLE ST_TREE CHANGE database_key database_key varchar(20) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TREE' and COLUMN_NAME = 'tree_key') then 
			ALTER TABLE ST_TREE ADD tree_key varchar(30) NOT NULL;
		else 
			ALTER TABLE ST_TREE CHANGE tree_key tree_key varchar(30) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TREE' and COLUMN_NAME = 'tree_name') then 
			ALTER TABLE ST_TREE ADD tree_name varchar(30) NOT NULL COMMENT '树名称';
		else 
			ALTER TABLE ST_TREE CHANGE tree_name tree_name varchar(30) NOT NULL COMMENT '树名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TREE' and COLUMN_NAME = 'tree_root_where') then 
			ALTER TABLE ST_TREE ADD tree_root_where varchar(256) COMMENT '根节点时的视图条件|一般为空，即显示全部数据，也可以设置为不显示任何数据';
		else 
			ALTER TABLE ST_TREE CHANGE tree_root_where tree_root_where varchar(256) COMMENT '根节点时的视图条件|一般为空，即显示全部数据，也可以设置为不显示任何数据';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TREE' and COLUMN_NAME = 'tree_first_node_value') then 
			ALTER TABLE ST_TREE ADD tree_first_node_value varchar(30) COMMENT '根节点条件|例如：机构树为循环节点，首节点为当前用户所在机构。';
		else 
			ALTER TABLE ST_TREE CHANGE tree_first_node_value tree_first_node_value varchar(30) COMMENT '根节点条件|例如：机构树为循环节点，首节点为当前用户所在机构。';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TREE' and COLUMN_NAME = 'tree_auto_expand') then 
			ALTER TABLE ST_TREE ADD tree_auto_expand int DEFAULT 0  NOT NULL COMMENT '是否自动展开第一级';
		else 
			ALTER TABLE ST_TREE CHANGE tree_auto_expand tree_auto_expand int DEFAULT 0  NOT NULL COMMENT '是否自动展开第一级';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TREE' and COLUMN_NAME = 'tree_remark') then 
			ALTER TABLE ST_TREE ADD tree_remark varchar(200);
		else 
			ALTER TABLE ST_TREE CHANGE tree_remark tree_remark varchar(200);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TREE' and COLUMN_NAME = 'creator') then 
			ALTER TABLE ST_TREE ADD creator varchar(20);
		else 
			ALTER TABLE ST_TREE CHANGE creator creator varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TREE' and COLUMN_NAME = 'cdate') then 
			ALTER TABLE ST_TREE ADD cdate datetime;
		else 
			ALTER TABLE ST_TREE CHANGE cdate cdate datetime;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TREE' and COLUMN_NAME = 'modifier') then 
			ALTER TABLE ST_TREE ADD modifier varchar(20);
		else 
			ALTER TABLE ST_TREE CHANGE modifier modifier varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TREE' and COLUMN_NAME = 'mdate') then 
			ALTER TABLE ST_TREE ADD mdate datetime;
		else 
			ALTER TABLE ST_TREE CHANGE mdate mdate datetime;
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_TREE' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_TREE ADD PRIMARY KEY(tree_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_TREE_NODE;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_TREE_NODE') then	  
				CREATE TABLE ST_TREE_NODE ( 
					tree_key varchar(30) NOT NULL,
					tree_node_level int NOT NULL COMMENT '树节点层级',
					single_condition int DEFAULT 0  NOT NULL COMMENT '单一条件|导航条件是否为单一条件，默认为0：合并父节点条件，1：单一节点条件',
					tree_node_field_type varchar(5) DEFAULT 'field'  COMMENT '导航字段类型|field：字段，sql：sql语句',
					tree_node_field varchar(1024) COMMENT '本级节点导航条件|字段或SQL语句，%v%表示当前节点的值(node_value)',
					tree_node_sql varchar(1024) NOT NULL COMMENT '节点数据源|node_value, node_text, node_title, sub_nodes and others，前四项为固定列名，sub_nodes可省',
					tree_node_remark varchar(200) COMMENT '备注'
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TREE_NODE' and COLUMN_NAME = 'tree_key') then 
			ALTER TABLE ST_TREE_NODE ADD tree_key varchar(30) NOT NULL;
		else 
			ALTER TABLE ST_TREE_NODE CHANGE tree_key tree_key varchar(30) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TREE_NODE' and COLUMN_NAME = 'tree_node_level') then 
			ALTER TABLE ST_TREE_NODE ADD tree_node_level int NOT NULL COMMENT '树节点层级';
		else 
			ALTER TABLE ST_TREE_NODE CHANGE tree_node_level tree_node_level int NOT NULL COMMENT '树节点层级';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TREE_NODE' and COLUMN_NAME = 'single_condition') then 
			ALTER TABLE ST_TREE_NODE ADD single_condition int DEFAULT 0  NOT NULL COMMENT '单一条件|导航条件是否为单一条件，默认为0：合并父节点条件，1：单一节点条件';
		else 
			ALTER TABLE ST_TREE_NODE CHANGE single_condition single_condition int DEFAULT 0  NOT NULL COMMENT '单一条件|导航条件是否为单一条件，默认为0：合并父节点条件，1：单一节点条件';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TREE_NODE' and COLUMN_NAME = 'tree_node_field_type') then 
			ALTER TABLE ST_TREE_NODE ADD tree_node_field_type varchar(5) DEFAULT 'field'  COMMENT '导航字段类型|field：字段，sql：sql语句';
		else 
			ALTER TABLE ST_TREE_NODE CHANGE tree_node_field_type tree_node_field_type varchar(5) DEFAULT 'field'  COMMENT '导航字段类型|field：字段，sql：sql语句';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TREE_NODE' and COLUMN_NAME = 'tree_node_field') then 
			ALTER TABLE ST_TREE_NODE ADD tree_node_field varchar(1024) COMMENT '本级节点导航条件|字段或SQL语句，%v%表示当前节点的值(node_value)';
		else 
			ALTER TABLE ST_TREE_NODE CHANGE tree_node_field tree_node_field varchar(1024) COMMENT '本级节点导航条件|字段或SQL语句，%v%表示当前节点的值(node_value)';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TREE_NODE' and COLUMN_NAME = 'tree_node_sql') then 
			ALTER TABLE ST_TREE_NODE ADD tree_node_sql varchar(1024) NOT NULL COMMENT '节点数据源|node_value, node_text, node_title, sub_nodes and others，前四项为固定列名，sub_nodes可省';
		else 
			ALTER TABLE ST_TREE_NODE CHANGE tree_node_sql tree_node_sql varchar(1024) NOT NULL COMMENT '节点数据源|node_value, node_text, node_title, sub_nodes and others，前四项为固定列名，sub_nodes可省';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_TREE_NODE' and COLUMN_NAME = 'tree_node_remark') then 
			ALTER TABLE ST_TREE_NODE ADD tree_node_remark varchar(200) COMMENT '备注';
		else 
			ALTER TABLE ST_TREE_NODE CHANGE tree_node_remark tree_node_remark varchar(200) COMMENT '备注';
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_TREE_NODE' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_TREE_NODE ADD PRIMARY KEY(tree_key,tree_node_level);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_USER;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_USER') then	  
				CREATE TABLE ST_USER ( 
					creator_office_id int NOT NULL COMMENT '当前用户创建人机构ID|例如：上级用户为下级机构创建的管理员账户，下级机构修改该账户',
					office_id int NOT NULL COMMENT '用户所属机构ID',
					user_key varchar(30) NOT NULL COMMENT '用户登录名称|初次登录后user_key不允许再修改，永久固定',
					user_key_md5 varchar(32),
					user_name varchar(20) NOT NULL COMMENT '用户姓名',
					user_password varchar(32) NOT NULL,
					user_type int DEFAULT 1  NOT NULL COMMENT '用户类型|-1:开发人员;0:系统内置用户,例如管理员; 1:用户自定义用户',
					user_inactive int DEFAULT 0  NOT NULL COMMENT '是否禁用',
					user_account_manager int DEFAULT 0  NOT NULL COMMENT '账户管理员',
					user_privilege_manager int DEFAULT 0  NOT NULL COMMENT '权限管理员',
					user_id_card varchar(18) COMMENT '身份证号|身份证号码或护照号码等',
					user_job_number varchar(20) COMMENT '工号|工作证号码',
					user_mobile varchar(20) COMMENT '手机号码',
					user_email varchar(30) COMMENT '电子邮箱',
					user_remark varchar(200) COMMENT '备注',
					creator varchar(20) COMMENT '创建日期',
					cdate datetime,
					modifier varchar(20),
					mdate datetime
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_USER' and COLUMN_NAME = 'creator_office_id') then 
			ALTER TABLE ST_USER ADD creator_office_id int NOT NULL COMMENT '当前用户创建人机构ID|例如：上级用户为下级机构创建的管理员账户，下级机构修改该账户';
		else 
			ALTER TABLE ST_USER CHANGE creator_office_id creator_office_id int NOT NULL COMMENT '当前用户创建人机构ID|例如：上级用户为下级机构创建的管理员账户，下级机构修改该账户';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_USER' and COLUMN_NAME = 'office_id') then 
			ALTER TABLE ST_USER ADD office_id int NOT NULL COMMENT '用户所属机构ID';
		else 
			ALTER TABLE ST_USER CHANGE office_id office_id int NOT NULL COMMENT '用户所属机构ID';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_USER' and COLUMN_NAME = 'user_key') then 
			ALTER TABLE ST_USER ADD user_key varchar(30) NOT NULL COMMENT '用户登录名称|初次登录后user_key不允许再修改，永久固定';
		else 
			ALTER TABLE ST_USER CHANGE user_key user_key varchar(30) NOT NULL COMMENT '用户登录名称|初次登录后user_key不允许再修改，永久固定';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_USER' and COLUMN_NAME = 'user_key_md5') then 
			ALTER TABLE ST_USER ADD user_key_md5 varchar(32);
		else 
			ALTER TABLE ST_USER CHANGE user_key_md5 user_key_md5 varchar(32);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_USER' and COLUMN_NAME = 'user_name') then 
			ALTER TABLE ST_USER ADD user_name varchar(20) NOT NULL COMMENT '用户姓名';
		else 
			ALTER TABLE ST_USER CHANGE user_name user_name varchar(20) NOT NULL COMMENT '用户姓名';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_USER' and COLUMN_NAME = 'user_password') then 
			ALTER TABLE ST_USER ADD user_password varchar(32) NOT NULL;
		else 
			ALTER TABLE ST_USER CHANGE user_password user_password varchar(32) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_USER' and COLUMN_NAME = 'user_type') then 
			ALTER TABLE ST_USER ADD user_type int DEFAULT 1  NOT NULL COMMENT '用户类型|-1:开发人员;0:系统内置用户,例如管理员; 1:用户自定义用户';
		else 
			ALTER TABLE ST_USER CHANGE user_type user_type int DEFAULT 1  NOT NULL COMMENT '用户类型|-1:开发人员;0:系统内置用户,例如管理员; 1:用户自定义用户';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_USER' and COLUMN_NAME = 'user_inactive') then 
			ALTER TABLE ST_USER ADD user_inactive int DEFAULT 0  NOT NULL COMMENT '是否禁用';
		else 
			ALTER TABLE ST_USER CHANGE user_inactive user_inactive int DEFAULT 0  NOT NULL COMMENT '是否禁用';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_USER' and COLUMN_NAME = 'user_account_manager') then 
			ALTER TABLE ST_USER ADD user_account_manager int DEFAULT 0  NOT NULL COMMENT '账户管理员';
		else 
			ALTER TABLE ST_USER CHANGE user_account_manager user_account_manager int DEFAULT 0  NOT NULL COMMENT '账户管理员';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_USER' and COLUMN_NAME = 'user_privilege_manager') then 
			ALTER TABLE ST_USER ADD user_privilege_manager int DEFAULT 0  NOT NULL COMMENT '权限管理员';
		else 
			ALTER TABLE ST_USER CHANGE user_privilege_manager user_privilege_manager int DEFAULT 0  NOT NULL COMMENT '权限管理员';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_USER' and COLUMN_NAME = 'user_id_card') then 
			ALTER TABLE ST_USER ADD user_id_card varchar(18) COMMENT '身份证号|身份证号码或护照号码等';
		else 
			ALTER TABLE ST_USER CHANGE user_id_card user_id_card varchar(18) COMMENT '身份证号|身份证号码或护照号码等';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_USER' and COLUMN_NAME = 'user_job_number') then 
			ALTER TABLE ST_USER ADD user_job_number varchar(20) COMMENT '工号|工作证号码';
		else 
			ALTER TABLE ST_USER CHANGE user_job_number user_job_number varchar(20) COMMENT '工号|工作证号码';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_USER' and COLUMN_NAME = 'user_mobile') then 
			ALTER TABLE ST_USER ADD user_mobile varchar(20) COMMENT '手机号码';
		else 
			ALTER TABLE ST_USER CHANGE user_mobile user_mobile varchar(20) COMMENT '手机号码';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_USER' and COLUMN_NAME = 'user_email') then 
			ALTER TABLE ST_USER ADD user_email varchar(30) COMMENT '电子邮箱';
		else 
			ALTER TABLE ST_USER CHANGE user_email user_email varchar(30) COMMENT '电子邮箱';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_USER' and COLUMN_NAME = 'user_remark') then 
			ALTER TABLE ST_USER ADD user_remark varchar(200) COMMENT '备注';
		else 
			ALTER TABLE ST_USER CHANGE user_remark user_remark varchar(200) COMMENT '备注';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_USER' and COLUMN_NAME = 'creator') then 
			ALTER TABLE ST_USER ADD creator varchar(20) COMMENT '创建日期';
		else 
			ALTER TABLE ST_USER CHANGE creator creator varchar(20) COMMENT '创建日期';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_USER' and COLUMN_NAME = 'cdate') then 
			ALTER TABLE ST_USER ADD cdate datetime;
		else 
			ALTER TABLE ST_USER CHANGE cdate cdate datetime;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_USER' and COLUMN_NAME = 'modifier') then 
			ALTER TABLE ST_USER ADD modifier varchar(20);
		else 
			ALTER TABLE ST_USER CHANGE modifier modifier varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_USER' and COLUMN_NAME = 'mdate') then 
			ALTER TABLE ST_USER ADD mdate datetime;
		else 
			ALTER TABLE ST_USER CHANGE mdate mdate datetime;
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_USER' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_USER ADD PRIMARY KEY(user_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_VIEW;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_VIEW') then	  
				CREATE TABLE ST_VIEW ( 
					system_name varchar(20) NOT NULL,
					database_key varchar(20) NOT NULL,
					table_key varchar(52) NOT NULL,
					table_name varchar(30),
					view_key varchar(30) NOT NULL COMMENT '视图KEY|建议系统库按照客户或产品分开，以保证视图KEY唯一',
					view_name varchar(40) NOT NULL COMMENT '视图名称',
					view_sql_select varchar(1024) NOT NULL COMMENT 'SELECT 部分|不包括 SELECT 关键字',
					view_sql_from varchar(512) NOT NULL COMMENT 'FROM部分|不包括 FROM 关键字',
					view_sql_where varchar(512) COMMENT 'WHERE部分|不包括 WHERE 关键字',
					view_sql_groupby varchar(256) COMMENT 'GROYP BY AND HAVING|不包括GROUP BY 关键字，但是包括HAVING关键字',
					view_sql_orderby varchar(128) COMMENT 'ORDER BY部分|不包括 ORDER BY 关键字',
					view_fixed_columns int NOT NULL COMMENT '固定列列数|总列数超出(固定列+浮动列)部分为隐藏列',
					view_float_columns int NOT NULL COMMENT '浮动列列数|总列数超出(固定列+浮动列)部分为隐藏列',
					view_allow_addnew int NOT NULL COMMENT '允许添加||0：不允许；1：允许',
					view_allow_modify int COMMENT '允许修改',
					view_allow_delete int COMMENT '允许删除||0：不允许；1：允许',
					view_allow_copy int DEFAULT 0  COMMENT '允许拷贝||0：不允许；1：允许',
					view_fn_view int DEFAULT 0  COMMENT '是否添加查看列|0：不显示；1：显示',
					view_fn_view_name varchar(20) COMMENT '编辑名称|编辑功能列的名称',
					view_fn_select int DEFAULT 0  COMMENT '是否添加筛选列|0：不显示；1：单选；2：多选',
					view_tree_width numeric(12,2) DEFAULT 0.15  NOT NULL COMMENT '导航树默认宽度|大于1为实际宽度，小于1为百分比',
					view_backup_table varchar(60) COMMENT '自动备份表',
					view_prohibit_export int DEFAULT 0  COMMENT '禁止导出|禁止数据导出',
					view_remark varchar(200),
					creator varchar(30),
					cdate datetime,
					modifier varchar(30),
					mdate datetime
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'system_name') then 
			ALTER TABLE ST_VIEW ADD system_name varchar(20) NOT NULL;
		else 
			ALTER TABLE ST_VIEW CHANGE system_name system_name varchar(20) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'database_key') then 
			ALTER TABLE ST_VIEW ADD database_key varchar(20) NOT NULL;
		else 
			ALTER TABLE ST_VIEW CHANGE database_key database_key varchar(20) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'table_key') then 
			ALTER TABLE ST_VIEW ADD table_key varchar(52) NOT NULL;
		else 
			ALTER TABLE ST_VIEW CHANGE table_key table_key varchar(52) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'table_name') then 
			ALTER TABLE ST_VIEW ADD table_name varchar(30);
		else 
			ALTER TABLE ST_VIEW CHANGE table_name table_name varchar(30);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'view_key') then 
			ALTER TABLE ST_VIEW ADD view_key varchar(30) NOT NULL COMMENT '视图KEY|建议系统库按照客户或产品分开，以保证视图KEY唯一';
		else 
			ALTER TABLE ST_VIEW CHANGE view_key view_key varchar(30) NOT NULL COMMENT '视图KEY|建议系统库按照客户或产品分开，以保证视图KEY唯一';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'view_name') then 
			ALTER TABLE ST_VIEW ADD view_name varchar(40) NOT NULL COMMENT '视图名称';
		else 
			ALTER TABLE ST_VIEW CHANGE view_name view_name varchar(40) NOT NULL COMMENT '视图名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'view_sql_select') then 
			ALTER TABLE ST_VIEW ADD view_sql_select varchar(1024) NOT NULL COMMENT 'SELECT 部分|不包括 SELECT 关键字';
		else 
			ALTER TABLE ST_VIEW CHANGE view_sql_select view_sql_select varchar(1024) NOT NULL COMMENT 'SELECT 部分|不包括 SELECT 关键字';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'view_sql_from') then 
			ALTER TABLE ST_VIEW ADD view_sql_from varchar(512) NOT NULL COMMENT 'FROM部分|不包括 FROM 关键字';
		else 
			ALTER TABLE ST_VIEW CHANGE view_sql_from view_sql_from varchar(512) NOT NULL COMMENT 'FROM部分|不包括 FROM 关键字';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'view_sql_where') then 
			ALTER TABLE ST_VIEW ADD view_sql_where varchar(512) COMMENT 'WHERE部分|不包括 WHERE 关键字';
		else 
			ALTER TABLE ST_VIEW CHANGE view_sql_where view_sql_where varchar(512) COMMENT 'WHERE部分|不包括 WHERE 关键字';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'view_sql_groupby') then 
			ALTER TABLE ST_VIEW ADD view_sql_groupby varchar(256) COMMENT 'GROYP BY AND HAVING|不包括GROUP BY 关键字，但是包括HAVING关键字';
		else 
			ALTER TABLE ST_VIEW CHANGE view_sql_groupby view_sql_groupby varchar(256) COMMENT 'GROYP BY AND HAVING|不包括GROUP BY 关键字，但是包括HAVING关键字';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'view_sql_orderby') then 
			ALTER TABLE ST_VIEW ADD view_sql_orderby varchar(128) COMMENT 'ORDER BY部分|不包括 ORDER BY 关键字';
		else 
			ALTER TABLE ST_VIEW CHANGE view_sql_orderby view_sql_orderby varchar(128) COMMENT 'ORDER BY部分|不包括 ORDER BY 关键字';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'view_fixed_columns') then 
			ALTER TABLE ST_VIEW ADD view_fixed_columns int NOT NULL COMMENT '固定列列数|总列数超出(固定列+浮动列)部分为隐藏列';
		else 
			ALTER TABLE ST_VIEW CHANGE view_fixed_columns view_fixed_columns int NOT NULL COMMENT '固定列列数|总列数超出(固定列+浮动列)部分为隐藏列';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'view_float_columns') then 
			ALTER TABLE ST_VIEW ADD view_float_columns int NOT NULL COMMENT '浮动列列数|总列数超出(固定列+浮动列)部分为隐藏列';
		else 
			ALTER TABLE ST_VIEW CHANGE view_float_columns view_float_columns int NOT NULL COMMENT '浮动列列数|总列数超出(固定列+浮动列)部分为隐藏列';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'view_allow_addnew') then 
			ALTER TABLE ST_VIEW ADD view_allow_addnew int NOT NULL COMMENT '允许添加||0：不允许；1：允许';
		else 
			ALTER TABLE ST_VIEW CHANGE view_allow_addnew view_allow_addnew int NOT NULL COMMENT '允许添加||0：不允许；1：允许';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'view_allow_modify') then 
			ALTER TABLE ST_VIEW ADD view_allow_modify int COMMENT '允许修改';
		else 
			ALTER TABLE ST_VIEW CHANGE view_allow_modify view_allow_modify int COMMENT '允许修改';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'view_allow_delete') then 
			ALTER TABLE ST_VIEW ADD view_allow_delete int COMMENT '允许删除||0：不允许；1：允许';
		else 
			ALTER TABLE ST_VIEW CHANGE view_allow_delete view_allow_delete int COMMENT '允许删除||0：不允许；1：允许';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'view_allow_copy') then 
			ALTER TABLE ST_VIEW ADD view_allow_copy int DEFAULT 0  COMMENT '允许拷贝||0：不允许；1：允许';
		else 
			ALTER TABLE ST_VIEW CHANGE view_allow_copy view_allow_copy int DEFAULT 0  COMMENT '允许拷贝||0：不允许；1：允许';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'view_fn_view') then 
			ALTER TABLE ST_VIEW ADD view_fn_view int DEFAULT 0  COMMENT '是否添加查看列|0：不显示；1：显示';
		else 
			ALTER TABLE ST_VIEW CHANGE view_fn_view view_fn_view int DEFAULT 0  COMMENT '是否添加查看列|0：不显示；1：显示';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'view_fn_view_name') then 
			ALTER TABLE ST_VIEW ADD view_fn_view_name varchar(20) COMMENT '编辑名称|编辑功能列的名称';
		else 
			ALTER TABLE ST_VIEW CHANGE view_fn_view_name view_fn_view_name varchar(20) COMMENT '编辑名称|编辑功能列的名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'view_fn_select') then 
			ALTER TABLE ST_VIEW ADD view_fn_select int DEFAULT 0  COMMENT '是否添加筛选列|0：不显示；1：单选；2：多选';
		else 
			ALTER TABLE ST_VIEW CHANGE view_fn_select view_fn_select int DEFAULT 0  COMMENT '是否添加筛选列|0：不显示；1：单选；2：多选';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'view_tree_width') then 
			ALTER TABLE ST_VIEW ADD view_tree_width numeric(12,2) DEFAULT 0.15  NOT NULL COMMENT '导航树默认宽度|大于1为实际宽度，小于1为百分比';
		else 
			ALTER TABLE ST_VIEW CHANGE view_tree_width view_tree_width numeric(12,2) DEFAULT 0.15  NOT NULL COMMENT '导航树默认宽度|大于1为实际宽度，小于1为百分比';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'view_backup_table') then 
			ALTER TABLE ST_VIEW ADD view_backup_table varchar(60) COMMENT '自动备份表';
		else 
			ALTER TABLE ST_VIEW CHANGE view_backup_table view_backup_table varchar(60) COMMENT '自动备份表';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'view_prohibit_export') then 
			ALTER TABLE ST_VIEW ADD view_prohibit_export int DEFAULT 0  COMMENT '禁止导出|禁止数据导出';
		else 
			ALTER TABLE ST_VIEW CHANGE view_prohibit_export view_prohibit_export int DEFAULT 0  COMMENT '禁止导出|禁止数据导出';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'view_remark') then 
			ALTER TABLE ST_VIEW ADD view_remark varchar(200);
		else 
			ALTER TABLE ST_VIEW CHANGE view_remark view_remark varchar(200);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'creator') then 
			ALTER TABLE ST_VIEW ADD creator varchar(30);
		else 
			ALTER TABLE ST_VIEW CHANGE creator creator varchar(30);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'cdate') then 
			ALTER TABLE ST_VIEW ADD cdate datetime;
		else 
			ALTER TABLE ST_VIEW CHANGE cdate cdate datetime;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'modifier') then 
			ALTER TABLE ST_VIEW ADD modifier varchar(30);
		else 
			ALTER TABLE ST_VIEW CHANGE modifier modifier varchar(30);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW' and COLUMN_NAME = 'mdate') then 
			ALTER TABLE ST_VIEW ADD mdate datetime;
		else 
			ALTER TABLE ST_VIEW CHANGE mdate mdate datetime;
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_VIEW' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_VIEW ADD PRIMARY KEY(view_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_VIEW_;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_VIEW_') then	  
				CREATE TABLE ST_VIEW_ ( 
					user_key varchar(20) NOT NULL,
					view_key varchar(30) NOT NULL,
					view_sql_select varchar(1024) NOT NULL COMMENT 'SELECT 部分|不包括 SELECT 关键字',
					view_fixed_columns int,
					view_float_columns int
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_' and COLUMN_NAME = 'user_key') then 
			ALTER TABLE ST_VIEW_ ADD user_key varchar(20) NOT NULL;
		else 
			ALTER TABLE ST_VIEW_ CHANGE user_key user_key varchar(20) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_' and COLUMN_NAME = 'view_key') then 
			ALTER TABLE ST_VIEW_ ADD view_key varchar(30) NOT NULL;
		else 
			ALTER TABLE ST_VIEW_ CHANGE view_key view_key varchar(30) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_' and COLUMN_NAME = 'view_sql_select') then 
			ALTER TABLE ST_VIEW_ ADD view_sql_select varchar(1024) NOT NULL COMMENT 'SELECT 部分|不包括 SELECT 关键字';
		else 
			ALTER TABLE ST_VIEW_ CHANGE view_sql_select view_sql_select varchar(1024) NOT NULL COMMENT 'SELECT 部分|不包括 SELECT 关键字';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_' and COLUMN_NAME = 'view_fixed_columns') then 
			ALTER TABLE ST_VIEW_ ADD view_fixed_columns int;
		else 
			ALTER TABLE ST_VIEW_ CHANGE view_fixed_columns view_fixed_columns int;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_' and COLUMN_NAME = 'view_float_columns') then 
			ALTER TABLE ST_VIEW_ ADD view_float_columns int;
		else 
			ALTER TABLE ST_VIEW_ CHANGE view_float_columns view_float_columns int;
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_VIEW_' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_VIEW_ ADD PRIMARY KEY(user_key,view_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_VIEW_EXTRA;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_VIEW_EXTRA') then	  
				CREATE TABLE ST_VIEW_EXTRA ( 
					view_key varchar(30) NOT NULL,
					menu_key varchar(30) DEFAULT '*'  NOT NULL COMMENT '菜单标识|默认为*,表示为与调用菜单无关',
					view_extra_key varchar(30) NOT NULL COMMENT '扩展功能标识',
					view_extra_text varchar(30) NOT NULL COMMENT '扩展功能名称',
					view_extra_type varchar(5) NOT NULL COMMENT '扩展功能类型|1：视图按钮；2：视图网格功能列；3：界面按钮',
					view_extra_width int DEFAULT 0  NOT NULL COMMENT '宽度|默认值为0，由系统自动根据文本内容计算出合适的宽度',
					view_extra_inactive int DEFAULT 0  NOT NULL COMMENT '禁用|默认为0',
					view_extra_remark varchar(200) COMMENT '扩展功能说明',
					view_extra_order int DEFAULT 999 ,
					view_extra_form_url varchar(100) COMMENT '弹出窗口url'
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_EXTRA' and COLUMN_NAME = 'view_key') then 
			ALTER TABLE ST_VIEW_EXTRA ADD view_key varchar(30) NOT NULL;
		else 
			ALTER TABLE ST_VIEW_EXTRA CHANGE view_key view_key varchar(30) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_EXTRA' and COLUMN_NAME = 'menu_key') then 
			ALTER TABLE ST_VIEW_EXTRA ADD menu_key varchar(30) DEFAULT '*'  NOT NULL COMMENT '菜单标识|默认为*,表示为与调用菜单无关';
		else 
			ALTER TABLE ST_VIEW_EXTRA CHANGE menu_key menu_key varchar(30) DEFAULT '*'  NOT NULL COMMENT '菜单标识|默认为*,表示为与调用菜单无关';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_EXTRA' and COLUMN_NAME = 'view_extra_key') then 
			ALTER TABLE ST_VIEW_EXTRA ADD view_extra_key varchar(30) NOT NULL COMMENT '扩展功能标识';
		else 
			ALTER TABLE ST_VIEW_EXTRA CHANGE view_extra_key view_extra_key varchar(30) NOT NULL COMMENT '扩展功能标识';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_EXTRA' and COLUMN_NAME = 'view_extra_text') then 
			ALTER TABLE ST_VIEW_EXTRA ADD view_extra_text varchar(30) NOT NULL COMMENT '扩展功能名称';
		else 
			ALTER TABLE ST_VIEW_EXTRA CHANGE view_extra_text view_extra_text varchar(30) NOT NULL COMMENT '扩展功能名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_EXTRA' and COLUMN_NAME = 'view_extra_type') then 
			ALTER TABLE ST_VIEW_EXTRA ADD view_extra_type varchar(5) NOT NULL COMMENT '扩展功能类型|1：视图按钮；2：视图网格功能列；3：界面按钮';
		else 
			ALTER TABLE ST_VIEW_EXTRA CHANGE view_extra_type view_extra_type varchar(5) NOT NULL COMMENT '扩展功能类型|1：视图按钮；2：视图网格功能列；3：界面按钮';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_EXTRA' and COLUMN_NAME = 'view_extra_width') then 
			ALTER TABLE ST_VIEW_EXTRA ADD view_extra_width int DEFAULT 0  NOT NULL COMMENT '宽度|默认值为0，由系统自动根据文本内容计算出合适的宽度';
		else 
			ALTER TABLE ST_VIEW_EXTRA CHANGE view_extra_width view_extra_width int DEFAULT 0  NOT NULL COMMENT '宽度|默认值为0，由系统自动根据文本内容计算出合适的宽度';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_EXTRA' and COLUMN_NAME = 'view_extra_inactive') then 
			ALTER TABLE ST_VIEW_EXTRA ADD view_extra_inactive int DEFAULT 0  NOT NULL COMMENT '禁用|默认为0';
		else 
			ALTER TABLE ST_VIEW_EXTRA CHANGE view_extra_inactive view_extra_inactive int DEFAULT 0  NOT NULL COMMENT '禁用|默认为0';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_EXTRA' and COLUMN_NAME = 'view_extra_remark') then 
			ALTER TABLE ST_VIEW_EXTRA ADD view_extra_remark varchar(200) COMMENT '扩展功能说明';
		else 
			ALTER TABLE ST_VIEW_EXTRA CHANGE view_extra_remark view_extra_remark varchar(200) COMMENT '扩展功能说明';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_EXTRA' and COLUMN_NAME = 'view_extra_order') then 
			ALTER TABLE ST_VIEW_EXTRA ADD view_extra_order int DEFAULT 999 ;
		else 
			ALTER TABLE ST_VIEW_EXTRA CHANGE view_extra_order view_extra_order int DEFAULT 999 ;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_EXTRA' and COLUMN_NAME = 'view_extra_form_url') then 
			ALTER TABLE ST_VIEW_EXTRA ADD view_extra_form_url varchar(100) COMMENT '弹出窗口url';
		else 
			ALTER TABLE ST_VIEW_EXTRA CHANGE view_extra_form_url view_extra_form_url varchar(100) COMMENT '弹出窗口url';
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_VIEW_EXTRA' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_VIEW_EXTRA ADD PRIMARY KEY(menu_key,view_extra_key,view_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_VIEW_FIELD;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_VIEW_FIELD') then	  
				CREATE TABLE ST_VIEW_FIELD ( 
					view_key varchar(30) NOT NULL,
					table_key varchar(52) COMMENT '外键,table.table_key',
					field_key varchar(82) NOT NULL,
					field_name varchar(30) NOT NULL COMMENT '字段名称',
					field_prefix varchar(30) COMMENT '查询前缀|多表关联时, 用于区分同名字段',
					field_text varchar(30) COMMENT '字段中文名称',
					field_title varchar(50) COMMENT '字段提示|显示在界面上,供用户参考',
					field_type varchar(10) NOT NULL COMMENT '精简数据类型|string、datetime、number',
					datatype varchar(20) NOT NULL COMMENT '物理字段类型|数据库中的实际数据类型，与数据库有关',
					field_length int COMMENT '字段长度,',
					field_pkey int DEFAULT 0  NOT NULL COMMENT '是否主键字段',
					field_identity int DEFAULT 0  NOT NULL COMMENT '是否自增量字段',
					field_nullable int DEFAULT 0  NOT NULL,
					field_updatable int COMMENT '是否允许更新|例如计算列',
					field_editable int COMMENT '允许手工编辑',
					field_default varchar(50) COMMENT '默认值|新建记录时自动填充',
					field_grid_control varchar(10) COMMENT '网格控件类型',
					field_grid_format varchar(30) COMMENT '网格界面格式',
					field_align varchar(10) COMMENT '对齐方向',
					field_pixel_width int COMMENT '网格宽度',
					field_input_format varchar(30) COMMENT '输入界面格式',
					field_validation_key varchar(30) COMMENT 'field_validation.key|字段值校验规则',
					field_control_type varchar(20) COMMENT '界面控件类型',
					field_query_type varchar(10) COMMENT '查询类型|文本输入、选择框、日期空间、下拉框、树、自定义窗口等',
					field_query_key varchar(30) COMMENT 'field_query.key',
					field_query_source varchar(500) COMMENT '数据源字符串或SQL语句|如果是有query_key的情况，表示为条件语句',
					field_query_order int DEFAULT 999  COMMENT '查询序号',
					field_remark varchar(200) COMMENT '字段说明|供程序员参考',
					creator varchar(20),
					cdate datetime,
					modifier varchar(20),
					mdate datetime
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'view_key') then 
			ALTER TABLE ST_VIEW_FIELD ADD view_key varchar(30) NOT NULL;
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE view_key view_key varchar(30) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'table_key') then 
			ALTER TABLE ST_VIEW_FIELD ADD table_key varchar(52) COMMENT '外键,table.table_key';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE table_key table_key varchar(52) COMMENT '外键,table.table_key';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_key') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_key varchar(82) NOT NULL;
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_key field_key varchar(82) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_name') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_name varchar(30) NOT NULL COMMENT '字段名称';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_name field_name varchar(30) NOT NULL COMMENT '字段名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_prefix') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_prefix varchar(30) COMMENT '查询前缀|多表关联时, 用于区分同名字段';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_prefix field_prefix varchar(30) COMMENT '查询前缀|多表关联时, 用于区分同名字段';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_text') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_text varchar(30) COMMENT '字段中文名称';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_text field_text varchar(30) COMMENT '字段中文名称';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_title') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_title varchar(50) COMMENT '字段提示|显示在界面上,供用户参考';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_title field_title varchar(50) COMMENT '字段提示|显示在界面上,供用户参考';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_type') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_type varchar(10) NOT NULL COMMENT '精简数据类型|string、datetime、number';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_type field_type varchar(10) NOT NULL COMMENT '精简数据类型|string、datetime、number';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'datatype') then 
			ALTER TABLE ST_VIEW_FIELD ADD datatype varchar(20) NOT NULL COMMENT '物理字段类型|数据库中的实际数据类型，与数据库有关';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE datatype datatype varchar(20) NOT NULL COMMENT '物理字段类型|数据库中的实际数据类型，与数据库有关';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_length') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_length int COMMENT '字段长度,';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_length field_length int COMMENT '字段长度,';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_pkey') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_pkey int DEFAULT 0  NOT NULL COMMENT '是否主键字段';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_pkey field_pkey int DEFAULT 0  NOT NULL COMMENT '是否主键字段';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_identity') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_identity int DEFAULT 0  NOT NULL COMMENT '是否自增量字段';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_identity field_identity int DEFAULT 0  NOT NULL COMMENT '是否自增量字段';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_nullable') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_nullable int DEFAULT 0  NOT NULL;
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_nullable field_nullable int DEFAULT 0  NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_updatable') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_updatable int COMMENT '是否允许更新|例如计算列';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_updatable field_updatable int COMMENT '是否允许更新|例如计算列';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_editable') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_editable int COMMENT '允许手工编辑';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_editable field_editable int COMMENT '允许手工编辑';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_default') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_default varchar(50) COMMENT '默认值|新建记录时自动填充';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_default field_default varchar(50) COMMENT '默认值|新建记录时自动填充';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_grid_control') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_grid_control varchar(10) COMMENT '网格控件类型';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_grid_control field_grid_control varchar(10) COMMENT '网格控件类型';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_grid_format') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_grid_format varchar(30) COMMENT '网格界面格式';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_grid_format field_grid_format varchar(30) COMMENT '网格界面格式';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_align') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_align varchar(10) COMMENT '对齐方向';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_align field_align varchar(10) COMMENT '对齐方向';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_pixel_width') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_pixel_width int COMMENT '网格宽度';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_pixel_width field_pixel_width int COMMENT '网格宽度';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_input_format') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_input_format varchar(30) COMMENT '输入界面格式';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_input_format field_input_format varchar(30) COMMENT '输入界面格式';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_validation_key') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_validation_key varchar(30) COMMENT 'field_validation.key|字段值校验规则';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_validation_key field_validation_key varchar(30) COMMENT 'field_validation.key|字段值校验规则';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_control_type') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_control_type varchar(20) COMMENT '界面控件类型';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_control_type field_control_type varchar(20) COMMENT '界面控件类型';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_query_type') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_query_type varchar(10) COMMENT '查询类型|文本输入、选择框、日期空间、下拉框、树、自定义窗口等';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_query_type field_query_type varchar(10) COMMENT '查询类型|文本输入、选择框、日期空间、下拉框、树、自定义窗口等';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_query_key') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_query_key varchar(30) COMMENT 'field_query.key';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_query_key field_query_key varchar(30) COMMENT 'field_query.key';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_query_source') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_query_source varchar(500) COMMENT '数据源字符串或SQL语句|如果是有query_key的情况，表示为条件语句';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_query_source field_query_source varchar(500) COMMENT '数据源字符串或SQL语句|如果是有query_key的情况，表示为条件语句';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_query_order') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_query_order int DEFAULT 999  COMMENT '查询序号';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_query_order field_query_order int DEFAULT 999  COMMENT '查询序号';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'field_remark') then 
			ALTER TABLE ST_VIEW_FIELD ADD field_remark varchar(200) COMMENT '字段说明|供程序员参考';
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE field_remark field_remark varchar(200) COMMENT '字段说明|供程序员参考';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'creator') then 
			ALTER TABLE ST_VIEW_FIELD ADD creator varchar(20);
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE creator creator varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'cdate') then 
			ALTER TABLE ST_VIEW_FIELD ADD cdate datetime;
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE cdate cdate datetime;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'modifier') then 
			ALTER TABLE ST_VIEW_FIELD ADD modifier varchar(20);
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE modifier modifier varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_FIELD' and COLUMN_NAME = 'mdate') then 
			ALTER TABLE ST_VIEW_FIELD ADD mdate datetime;
		else 
			ALTER TABLE ST_VIEW_FIELD CHANGE mdate mdate datetime;
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_VIEW_FIELD' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_VIEW_FIELD ADD PRIMARY KEY(field_name,view_key);
		end if;
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_VIEW_FIELD' and index_name = 'IX_ST_VIEW_FIELD_view_key') then 
			ALTER TABLE ST_VIEW_FIELD ADD INDEX IX_ST_VIEW_FIELD_view_key(view_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE ST_VIEW_TREE;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='ST_VIEW_TREE') then	  
				CREATE TABLE ST_VIEW_TREE ( 
					view_key varchar(30) NOT NULL,
					tree_key varchar(30) NOT NULL,
					view_tree_max_level int DEFAULT 0  NOT NULL COMMENT '最大节点级数|默认值为0：不限制最大级数',
					view_tree_order int DEFAULT 999  NOT NULL COMMENT '树序号'
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_TREE' and COLUMN_NAME = 'view_key') then 
			ALTER TABLE ST_VIEW_TREE ADD view_key varchar(30) NOT NULL;
		else 
			ALTER TABLE ST_VIEW_TREE CHANGE view_key view_key varchar(30) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_TREE' and COLUMN_NAME = 'tree_key') then 
			ALTER TABLE ST_VIEW_TREE ADD tree_key varchar(30) NOT NULL;
		else 
			ALTER TABLE ST_VIEW_TREE CHANGE tree_key tree_key varchar(30) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_TREE' and COLUMN_NAME = 'view_tree_max_level') then 
			ALTER TABLE ST_VIEW_TREE ADD view_tree_max_level int DEFAULT 0  NOT NULL COMMENT '最大节点级数|默认值为0：不限制最大级数';
		else 
			ALTER TABLE ST_VIEW_TREE CHANGE view_tree_max_level view_tree_max_level int DEFAULT 0  NOT NULL COMMENT '最大节点级数|默认值为0：不限制最大级数';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='ST_VIEW_TREE' and COLUMN_NAME = 'view_tree_order') then 
			ALTER TABLE ST_VIEW_TREE ADD view_tree_order int DEFAULT 999  NOT NULL COMMENT '树序号';
		else 
			ALTER TABLE ST_VIEW_TREE CHANGE view_tree_order view_tree_order int DEFAULT 999  NOT NULL COMMENT '树序号';
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'ST_VIEW_TREE' and index_name = 'PRIMARY') then 
			ALTER TABLE ST_VIEW_TREE ADD PRIMARY KEY(tree_key,view_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE WT_ALIPAY;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='WT_ALIPAY') then	  
				CREATE TABLE WT_ALIPAY ( 
					partner varchar(16) NOT NULL COMMENT '合作身份者ID，以2088开头由16位纯数字组成的字符串',
					seller_id varchar(16) NOT NULL COMMENT '收款支付宝账号，以2088开头由16位纯数字组成的字符串',
					private_key varchar(1024)
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_ALIPAY' and COLUMN_NAME = 'partner') then 
			ALTER TABLE WT_ALIPAY ADD partner varchar(16) NOT NULL COMMENT '合作身份者ID，以2088开头由16位纯数字组成的字符串';
		else 
			ALTER TABLE WT_ALIPAY CHANGE partner partner varchar(16) NOT NULL COMMENT '合作身份者ID，以2088开头由16位纯数字组成的字符串';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_ALIPAY' and COLUMN_NAME = 'seller_id') then 
			ALTER TABLE WT_ALIPAY ADD seller_id varchar(16) NOT NULL COMMENT '收款支付宝账号，以2088开头由16位纯数字组成的字符串';
		else 
			ALTER TABLE WT_ALIPAY CHANGE seller_id seller_id varchar(16) NOT NULL COMMENT '收款支付宝账号，以2088开头由16位纯数字组成的字符串';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_ALIPAY' and COLUMN_NAME = 'private_key') then 
			ALTER TABLE WT_ALIPAY ADD private_key varchar(1024);
		else 
			ALTER TABLE WT_ALIPAY CHANGE private_key private_key varchar(1024);
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'WT_ALIPAY' and index_name = 'PRIMARY') then 
			ALTER TABLE WT_ALIPAY ADD PRIMARY KEY(partner);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE WT_MENU;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='WT_MENU') then	  
				CREATE TABLE WT_MENU ( 
					service_key varchar(20) NOT NULL,
					menu_key_parent varchar(20) DEFAULT 'ROOT'  NOT NULL,
					menu_key varchar(20) NOT NULL,
					menu_name varchar(20) NOT NULL,
					menu_type varchar(20) NOT NULL,
					menu_need_oauth int DEFAULT 0  NOT NULL,
					menu_inactive int DEFAULT 0  COMMENT '是否禁用|1：禁用，0：启用',
					menu_url varchar(512),
					menu_order int DEFAULT 9  NOT NULL,
					menu_remark varchar(100)
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_MENU' and COLUMN_NAME = 'service_key') then 
			ALTER TABLE WT_MENU ADD service_key varchar(20) NOT NULL;
		else 
			ALTER TABLE WT_MENU CHANGE service_key service_key varchar(20) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_MENU' and COLUMN_NAME = 'menu_key_parent') then 
			ALTER TABLE WT_MENU ADD menu_key_parent varchar(20) DEFAULT 'ROOT'  NOT NULL;
		else 
			ALTER TABLE WT_MENU CHANGE menu_key_parent menu_key_parent varchar(20) DEFAULT 'ROOT'  NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_MENU' and COLUMN_NAME = 'menu_key') then 
			ALTER TABLE WT_MENU ADD menu_key varchar(20) NOT NULL;
		else 
			ALTER TABLE WT_MENU CHANGE menu_key menu_key varchar(20) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_MENU' and COLUMN_NAME = 'menu_name') then 
			ALTER TABLE WT_MENU ADD menu_name varchar(20) NOT NULL;
		else 
			ALTER TABLE WT_MENU CHANGE menu_name menu_name varchar(20) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_MENU' and COLUMN_NAME = 'menu_type') then 
			ALTER TABLE WT_MENU ADD menu_type varchar(20) NOT NULL;
		else 
			ALTER TABLE WT_MENU CHANGE menu_type menu_type varchar(20) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_MENU' and COLUMN_NAME = 'menu_need_oauth') then 
			ALTER TABLE WT_MENU ADD menu_need_oauth int DEFAULT 0  NOT NULL;
		else 
			ALTER TABLE WT_MENU CHANGE menu_need_oauth menu_need_oauth int DEFAULT 0  NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_MENU' and COLUMN_NAME = 'menu_inactive') then 
			ALTER TABLE WT_MENU ADD menu_inactive int DEFAULT 0  COMMENT '是否禁用|1：禁用，0：启用';
		else 
			ALTER TABLE WT_MENU CHANGE menu_inactive menu_inactive int DEFAULT 0  COMMENT '是否禁用|1：禁用，0：启用';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_MENU' and COLUMN_NAME = 'menu_url') then 
			ALTER TABLE WT_MENU ADD menu_url varchar(512);
		else 
			ALTER TABLE WT_MENU CHANGE menu_url menu_url varchar(512);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_MENU' and COLUMN_NAME = 'menu_order') then 
			ALTER TABLE WT_MENU ADD menu_order int DEFAULT 9  NOT NULL;
		else 
			ALTER TABLE WT_MENU CHANGE menu_order menu_order int DEFAULT 9  NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_MENU' and COLUMN_NAME = 'menu_remark') then 
			ALTER TABLE WT_MENU ADD menu_remark varchar(100);
		else 
			ALTER TABLE WT_MENU CHANGE menu_remark menu_remark varchar(100);
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'WT_MENU' and index_name = 'PRIMARY') then 
			ALTER TABLE WT_MENU ADD PRIMARY KEY(menu_key,service_key);
		end if;
	END
$$ DELIMITER ;

call sp_db_structure();
DROP PROCEDURE IF EXISTS sp_db_structure;

DELIMITER $$
CREATE PROCEDURE sp_db_structure ()
	BEGIN
		-- DROP TABLE WT_SERVICE;
		if not exists (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME='WT_SERVICE') then	  
				CREATE TABLE WT_SERVICE ( 
					service_key varchar(20) NOT NULL,
					service_name varchar(20),
					app_id varchar(20) NOT NULL,
					app_secret varchar(32) NOT NULL,
					token varchar(32),
					merchant_id varchar(12) COMMENT '商户号',
					oauth_domain varchar(50) COMMENT '网页授权回调域名',
					oauth_do varchar(50) COMMENT '网页授权回调URL',
					transfer_url varchar(50) COMMENT '中转页面',
					service_remark varchar(200)
			); 
		end if;

		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_SERVICE' and COLUMN_NAME = 'service_key') then 
			ALTER TABLE WT_SERVICE ADD service_key varchar(20) NOT NULL;
		else 
			ALTER TABLE WT_SERVICE CHANGE service_key service_key varchar(20) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_SERVICE' and COLUMN_NAME = 'service_name') then 
			ALTER TABLE WT_SERVICE ADD service_name varchar(20);
		else 
			ALTER TABLE WT_SERVICE CHANGE service_name service_name varchar(20);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_SERVICE' and COLUMN_NAME = 'app_id') then 
			ALTER TABLE WT_SERVICE ADD app_id varchar(20) NOT NULL;
		else 
			ALTER TABLE WT_SERVICE CHANGE app_id app_id varchar(20) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_SERVICE' and COLUMN_NAME = 'app_secret') then 
			ALTER TABLE WT_SERVICE ADD app_secret varchar(32) NOT NULL;
		else 
			ALTER TABLE WT_SERVICE CHANGE app_secret app_secret varchar(32) NOT NULL;
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_SERVICE' and COLUMN_NAME = 'token') then 
			ALTER TABLE WT_SERVICE ADD token varchar(32);
		else 
			ALTER TABLE WT_SERVICE CHANGE token token varchar(32);
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_SERVICE' and COLUMN_NAME = 'merchant_id') then 
			ALTER TABLE WT_SERVICE ADD merchant_id varchar(12) COMMENT '商户号';
		else 
			ALTER TABLE WT_SERVICE CHANGE merchant_id merchant_id varchar(12) COMMENT '商户号';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_SERVICE' and COLUMN_NAME = 'oauth_domain') then 
			ALTER TABLE WT_SERVICE ADD oauth_domain varchar(50) COMMENT '网页授权回调域名';
		else 
			ALTER TABLE WT_SERVICE CHANGE oauth_domain oauth_domain varchar(50) COMMENT '网页授权回调域名';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_SERVICE' and COLUMN_NAME = 'oauth_do') then 
			ALTER TABLE WT_SERVICE ADD oauth_do varchar(50) COMMENT '网页授权回调URL';
		else 
			ALTER TABLE WT_SERVICE CHANGE oauth_do oauth_do varchar(50) COMMENT '网页授权回调URL';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_SERVICE' and COLUMN_NAME = 'transfer_url') then 
			ALTER TABLE WT_SERVICE ADD transfer_url varchar(50) COMMENT '中转页面';
		else 
			ALTER TABLE WT_SERVICE CHANGE transfer_url transfer_url varchar(50) COMMENT '中转页面';
		end if; 
		if not exists (select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='WT_SERVICE' and COLUMN_NAME = 'service_remark') then 
			ALTER TABLE WT_SERVICE ADD service_remark varchar(200);
		else 
			ALTER TABLE WT_SERVICE CHANGE service_remark service_remark varchar(200);
		end if; 
		if not exists (select * from INFORMATION_SCHEMA.STATISTICS where TABLE_SCHEMA = (SELECT DATABASE()) AND TABLE_NAME = 'WT_SERVICE' and index_name = 'PRIMARY') then 
			ALTER TABLE WT_SERVICE ADD PRIMARY KEY(service_key);
		end if;
		UPDATE ST_SYSTEM SET system_version = 1 WHERE system_key = 'X99';
	END
$$ DELIMITER ;

call sp_db_structure();
