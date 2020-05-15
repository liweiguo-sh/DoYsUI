-- TABLE: ST_DATABASE; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_DATABASE');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_DATABASE ( 
					database_key VARCHAR2(20),
					database_name VARCHAR2(20),
					database_text VARCHAR2(30),
					database_type VARCHAR2(20),
					database_version VARCHAR2(10),
					database_owner VARCHAR2(20),
					database_remark VARCHAR2(200),
					creator VARCHAR2(20),
					cdate DATE,
					modifier VARCHAR2(20),
					mdate DATE
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_DATABASE') AND COLUMN_NAME = upper('database_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_DATABASE ADD database_key VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_DATABASE') AND COLUMN_NAME = upper('database_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_DATABASE ADD database_name VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_DATABASE') AND COLUMN_NAME = upper('database_text');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_DATABASE ADD database_text VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_DATABASE') AND COLUMN_NAME = upper('database_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_DATABASE ADD database_type VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_DATABASE') AND COLUMN_NAME = upper('database_version');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_DATABASE ADD database_version VARCHAR2(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_DATABASE') AND COLUMN_NAME = upper('database_owner');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_DATABASE ADD database_owner VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_DATABASE') AND COLUMN_NAME = upper('database_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_DATABASE ADD database_remark VARCHAR2(200)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_DATABASE') AND COLUMN_NAME = upper('creator');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_DATABASE ADD creator VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_DATABASE') AND COLUMN_NAME = upper('cdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_DATABASE ADD cdate DATE'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_DATABASE') AND COLUMN_NAME = upper('modifier');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_DATABASE ADD modifier VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_DATABASE') AND COLUMN_NAME = upper('mdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_DATABASE ADD mdate DATE'; 
	END IF;

	execute immediate 'comment on column ST_DATABASE.database_key is ''逻辑数据库名称|项目创建后不可修改,需和连接池名称一致''';
	execute immediate 'comment on column ST_DATABASE.database_name is ''物理数据库名称|可以根据实际需要更换数据库名称''';
	execute immediate 'comment on column ST_DATABASE.database_text is ''数据库名称''';
	execute immediate 'comment on column ST_DATABASE.database_type is ''数据库类型''';
	execute immediate 'comment on column ST_DATABASE.database_version is ''数据库版本''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_DATABASE');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_DATABASE ADD CONSTRAINT PK_ST_DATABASE PRIMARY KEY(database_key)';
	END IF; 
END;
/ 

-- TABLE: ST_FIELD; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_FIELD');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_FIELD ( 
					table_key VARCHAR2(52),
					field_key VARCHAR2(82),
					field_name VARCHAR2(30),
					field_title VARCHAR2(50),
					field_type VARCHAR2(10),
					datatype VARCHAR2(20),
					field_text VARCHAR2(50),
					field_length NUMBER(10),
					field_pkey NUMBER(10),
					field_identity NUMBER(10),
					field_nullable NUMBER(10),
					field_updatable NUMBER(10),
					field_editable NUMBER(10),
					field_default VARCHAR2(50),
					field_grid_format VARCHAR2(30),
					field_align VARCHAR2(10),
					field_pixel_width NUMBER(10),
					field_input_format VARCHAR2(30),
					field_validation_key VARCHAR2(30),
					field_control_type VARCHAR2(20),
					field_query_type VARCHAR2(10),
					field_query_key VARCHAR2(30),
					field_query_source VARCHAR2(200),
					field_query_order NUMBER(10),
					field_note VARCHAR2(200),
					field_remark VARCHAR2(200),
					creator VARCHAR2(20),
					cdate DATE,
					modifier VARCHAR2(20),
					mdate DATE
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('table_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD table_key VARCHAR2(52) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_key VARCHAR2(82) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_name VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_title');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_title VARCHAR2(50)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_type VARCHAR2(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('datatype');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD datatype VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_text');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_text VARCHAR2(50)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_length');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_length NUMBER(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_pkey');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_pkey NUMBER(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_identity');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_identity NUMBER(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_nullable');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_nullable NUMBER(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_updatable');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_updatable NUMBER(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_editable');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_editable NUMBER(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_default');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_default VARCHAR2(50)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_grid_format');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_grid_format VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_align');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_align VARCHAR2(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_pixel_width');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_pixel_width NUMBER(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_input_format');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_input_format VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_validation_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_validation_key VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_control_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_control_type VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_query_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_query_type VARCHAR2(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_query_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_query_key VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_query_source');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_query_source VARCHAR2(200)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_query_order');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_query_order NUMBER(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_note');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_note VARCHAR2(200)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('field_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD field_remark VARCHAR2(200)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('creator');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD creator VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('cdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD cdate DATE'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('modifier');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD modifier VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD') AND COLUMN_NAME = upper('mdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD mdate DATE'; 
	END IF;

	execute immediate 'comment on column ST_FIELD.table_key is ''外键,table.table_key''';
	execute immediate 'comment on column ST_FIELD.field_name is ''字段名称''';
	execute immediate 'comment on column ST_FIELD.field_title is ''字段提示|显示在界面上,供用户参考''';
	execute immediate 'comment on column ST_FIELD.field_type is ''精简数据类型|string、datetime、number''';
	execute immediate 'comment on column ST_FIELD.datatype is ''物理字段类型|数据库中的实际数据类型，与数据库有关''';
	execute immediate 'comment on column ST_FIELD.field_text is ''字段中文名称''';
	execute immediate 'comment on column ST_FIELD.field_length is ''字段长度,''';
	execute immediate 'comment on column ST_FIELD.field_pkey is ''是否主键字段''';
	execute immediate 'comment on column ST_FIELD.field_identity is ''是否自增量字段''';
	execute immediate 'comment on column ST_FIELD.field_nullable is ''是否允许为空''';
	execute immediate 'comment on column ST_FIELD.field_updatable is ''是否允许更新|例如计算列''';
	execute immediate 'comment on column ST_FIELD.field_editable is ''允许手工编辑''';
	execute immediate 'comment on column ST_FIELD.field_default is ''默认值|新建记录时自动填充''';
	execute immediate 'comment on column ST_FIELD.field_grid_format is ''网格界面格式''';
	execute immediate 'comment on column ST_FIELD.field_align is ''对齐方向''';
	execute immediate 'comment on column ST_FIELD.field_pixel_width is ''网格宽度''';
	execute immediate 'comment on column ST_FIELD.field_input_format is ''输入界面格式''';
	execute immediate 'comment on column ST_FIELD.field_validation_key is ''field_validation.key|字段值校验规则''';
	execute immediate 'comment on column ST_FIELD.field_control_type is ''控件类型|控件数据来源等同查询''';
	execute immediate 'comment on column ST_FIELD.field_query_type is ''查询类型|文本输入、选择框、日期空间、下拉框、树、自定义窗口等''';
	execute immediate 'comment on column ST_FIELD.field_query_key is ''field_query.key''';
	execute immediate 'comment on column ST_FIELD.field_query_source is ''数据源字符串或SQL语句|如果是有query_key的情况，表示为条件语句''';
	execute immediate 'comment on column ST_FIELD.field_query_order is ''查询序号''';
	execute immediate 'comment on column ST_FIELD.field_note is ''字段数据库注释|在数据库表中的注释内容''';
	execute immediate 'comment on column ST_FIELD.field_remark is ''字段说明|供程序员参考''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_FIELD');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD ADD CONSTRAINT PK_ST_FIELD PRIMARY KEY(field_key)';
	END IF; 
END;
/ 

-- TABLE: ST_FIELD_QUERY; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_FIELD_QUERY');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_FIELD_QUERY ( 
					field_query_key VARCHAR2(30)
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FIELD_QUERY') AND COLUMN_NAME = upper('field_query_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD_QUERY ADD field_query_key VARCHAR2(30) NOT NULL'; 
	END IF;


	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_FIELD_QUERY');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FIELD_QUERY ADD CONSTRAINT PK_ST_FIELD_QUERY PRIMARY KEY(field_query_key)';
	END IF; 
END;
/ 

-- TABLE: ST_FLOW; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_FLOW');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_FLOW ( 
					flow_key VARCHAR2(30),
					flow_name VARCHAR2(30),
					flow_root_filter VARCHAR2(500),
					flow_allow_batch NUMBER(10),
					flow_form_target VARCHAR2(100),
					flow_remark VARCHAR2(200),
					creator VARCHAR2(30),
					cdate DATE,
					modifier VARCHAR2(30),
					mdate DATE
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW') AND COLUMN_NAME = upper('flow_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW ADD flow_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW') AND COLUMN_NAME = upper('flow_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW ADD flow_name VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW') AND COLUMN_NAME = upper('flow_root_filter');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW ADD flow_root_filter VARCHAR2(500)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW') AND COLUMN_NAME = upper('flow_allow_batch');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW ADD flow_allow_batch NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW') AND COLUMN_NAME = upper('flow_form_target');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW ADD flow_form_target VARCHAR2(100)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW') AND COLUMN_NAME = upper('flow_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW ADD flow_remark VARCHAR2(200)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW') AND COLUMN_NAME = upper('creator');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW ADD creator VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW') AND COLUMN_NAME = upper('cdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW ADD cdate DATE NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW') AND COLUMN_NAME = upper('modifier');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW ADD modifier VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW') AND COLUMN_NAME = upper('mdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW ADD mdate DATE'; 
	END IF;

	execute immediate 'comment on column ST_FLOW.flow_name is ''流程名称''';
	execute immediate 'comment on column ST_FLOW.flow_root_filter is ''流程根节点条件''';
	execute immediate 'comment on column ST_FLOW.flow_allow_batch is ''是否允许批量操作''';
	execute immediate 'comment on column ST_FLOW.flow_form_target is ''后台类包|批量处理时，非标准编辑界面对应的后台类''';
	execute immediate 'comment on column ST_FLOW.flow_remark is ''备注''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_FLOW');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW ADD CONSTRAINT PK_ST_FLOW PRIMARY KEY(flow_key)';
	END IF; 
	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('IX_ST_FLOW');
	IF (num1 = 0) THEN 
		execute immediate 'CREATE UNIQUE INDEX IX_ST_FLOW on ST_FLOW(flow_name)';
	END IF; 
END;
/ 

-- TABLE: ST_FLOW_BUTTON; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_FLOW_BUTTON');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_FLOW_BUTTON ( 
					flow_key VARCHAR2(30),
					fb_key VARCHAR2(30),
					fb_name VARCHAR2(30),
					fb_tip VARCHAR2(100),
					fb_groups VARCHAR2(100),
					fb_users VARCHAR2(100),
					fb_sql_condition VARCHAR2(100),
					fb_field_status VARCHAR2(30),
					fb_status_value NUMBER(10),
					fb_field_note VARCHAR2(30),
					fb_field_auditor VARCHAR2(30),
					fb_field_adate VARCHAR2(30),
					fb_remove_option NUMBER(10),
					fb_order NUMBER(10)
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_BUTTON') AND COLUMN_NAME = upper('flow_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_BUTTON ADD flow_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_BUTTON') AND COLUMN_NAME = upper('fb_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_BUTTON ADD fb_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_BUTTON') AND COLUMN_NAME = upper('fb_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_BUTTON ADD fb_name VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_BUTTON') AND COLUMN_NAME = upper('fb_tip');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_BUTTON ADD fb_tip VARCHAR2(100)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_BUTTON') AND COLUMN_NAME = upper('fb_groups');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_BUTTON ADD fb_groups VARCHAR2(100)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_BUTTON') AND COLUMN_NAME = upper('fb_users');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_BUTTON ADD fb_users VARCHAR2(100)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_BUTTON') AND COLUMN_NAME = upper('fb_sql_condition');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_BUTTON ADD fb_sql_condition VARCHAR2(100)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_BUTTON') AND COLUMN_NAME = upper('fb_field_status');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_BUTTON ADD fb_field_status VARCHAR2(30) DEFAULT ''0''  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_BUTTON') AND COLUMN_NAME = upper('fb_status_value');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_BUTTON ADD fb_status_value NUMBER(10) DEFAULT 1  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_BUTTON') AND COLUMN_NAME = upper('fb_field_note');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_BUTTON ADD fb_field_note VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_BUTTON') AND COLUMN_NAME = upper('fb_field_auditor');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_BUTTON ADD fb_field_auditor VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_BUTTON') AND COLUMN_NAME = upper('fb_field_adate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_BUTTON ADD fb_field_adate VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_BUTTON') AND COLUMN_NAME = upper('fb_remove_option');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_BUTTON ADD fb_remove_option NUMBER(10) DEFAULT 1  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_BUTTON') AND COLUMN_NAME = upper('fb_order');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_BUTTON ADD fb_order NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;

	execute immediate 'comment on column ST_FLOW_BUTTON.fb_key is ''按钮标识''';
	execute immediate 'comment on column ST_FLOW_BUTTON.fb_name is ''按钮名称''';
	execute immediate 'comment on column ST_FLOW_BUTTON.fb_tip is ''按钮提示''';
	execute immediate 'comment on column ST_FLOW_BUTTON.fb_groups is ''用户组''';
	execute immediate 'comment on column ST_FLOW_BUTTON.fb_users is ''用户''';
	execute immediate 'comment on column ST_FLOW_BUTTON.fb_sql_condition is ''条件SQL|符合当前按钮操作的条件，SQL语法''';
	execute immediate 'comment on column ST_FLOW_BUTTON.fb_field_status is ''状态字段''';
	execute immediate 'comment on column ST_FLOW_BUTTON.fb_status_value is ''审核后状态值|执行该操作之后的值''';
	execute immediate 'comment on column ST_FLOW_BUTTON.fb_field_note is ''内容字段''';
	execute immediate 'comment on column ST_FLOW_BUTTON.fb_field_auditor is ''审核人字段''';
	execute immediate 'comment on column ST_FLOW_BUTTON.fb_field_adate is ''审核时间字段''';
	execute immediate 'comment on column ST_FLOW_BUTTON.fb_remove_option is ''移除选项|执行操作后是否移除当前记录，默认移除''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_FLOW_BUTTON');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_BUTTON ADD CONSTRAINT PK_ST_FLOW_BUTTON PRIMARY KEY(fb_key,flow_key)';
	END IF; 
	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('IX_ST_FLOW_BUTTON_flow_key');
	IF (num1 = 0) THEN 
		execute immediate 'CREATE INDEX IX_ST_FLOW_BUTTON_flow_key on ST_FLOW_BUTTON(flow_key)';
	END IF; 
END;
/ 

-- TABLE: ST_FLOW_NODE; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_FLOW_NODE');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_FLOW_NODE ( 
					flow_key VARCHAR2(30),
					fn_key VARCHAR2(5),
					fn_name VARCHAR2(30),
					fn_show_option NUMBER(10),
					fn_filter VARCHAR2(512),
					fn_groups VARCHAR2(100),
					fn_users VARCHAR2(100),
					fn_order NUMBER(10),
					fn_remark VARCHAR2(100)
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_NODE') AND COLUMN_NAME = upper('flow_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_NODE ADD flow_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_NODE') AND COLUMN_NAME = upper('fn_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_NODE ADD fn_key VARCHAR2(5) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_NODE') AND COLUMN_NAME = upper('fn_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_NODE ADD fn_name VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_NODE') AND COLUMN_NAME = upper('fn_show_option');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_NODE ADD fn_show_option NUMBER(10) DEFAULT 1  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_NODE') AND COLUMN_NAME = upper('fn_filter');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_NODE ADD fn_filter VARCHAR2(512) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_NODE') AND COLUMN_NAME = upper('fn_groups');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_NODE ADD fn_groups VARCHAR2(100)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_NODE') AND COLUMN_NAME = upper('fn_users');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_NODE ADD fn_users VARCHAR2(100)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_NODE') AND COLUMN_NAME = upper('fn_order');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_NODE ADD fn_order NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_FLOW_NODE') AND COLUMN_NAME = upper('fn_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_NODE ADD fn_remark VARCHAR2(100)'; 
	END IF;

	execute immediate 'comment on column ST_FLOW_NODE.fn_key is ''节点标识''';
	execute immediate 'comment on column ST_FLOW_NODE.fn_name is ''节点名称|例如：财务待审核''';
	execute immediate 'comment on column ST_FLOW_NODE.fn_show_option is ''显示选项|-1：禁用；0：根据权限决定；1：显示，如无权限，SQL增加1=0''';
	execute immediate 'comment on column ST_FLOW_NODE.fn_filter is ''节点数据条件''';
	execute immediate 'comment on column ST_FLOW_NODE.fn_groups is ''用户组''';
	execute immediate 'comment on column ST_FLOW_NODE.fn_users is ''用户''';
	execute immediate 'comment on column ST_FLOW_NODE.fn_order is ''序号''';
	execute immediate 'comment on column ST_FLOW_NODE.fn_remark is ''备注''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_FLOW_NODE');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_FLOW_NODE ADD CONSTRAINT PK_ST_FLOW_NODE PRIMARY KEY(flow_key,fn_key)';
	END IF; 
	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('IX_ST_FLOW_NODE');
	IF (num1 = 0) THEN 
		execute immediate 'CREATE UNIQUE INDEX IX_ST_FLOW_NODE on ST_FLOW_NODE(fn_name,flow_key)';
	END IF; 
	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('FX_ST_FN_flow_key');
	IF (num1 = 0) THEN 
		execute immediate 'CREATE INDEX FX_ST_FN_flow_key on ST_FLOW_NODE(flow_key)';
	END IF; 
END;
/ 

-- TABLE: ST_GROUP; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_GROUP');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_GROUP ( 
					office_id NUMBER(10),
					group_key VARCHAR2(30),
					group_name VARCHAR2(30),
					group_inactive NUMBER(10),
					group_option1 NUMBER(10),
					group_type NUMBER(10),
					group_remark VARCHAR2(200),
					creator VARCHAR2(20),
					cdate DATE,
					modifier VARCHAR2(20),
					mdate DATE
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_GROUP') AND COLUMN_NAME = upper('office_id');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_GROUP ADD office_id NUMBER(10) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_GROUP') AND COLUMN_NAME = upper('group_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_GROUP ADD group_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_GROUP') AND COLUMN_NAME = upper('group_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_GROUP ADD group_name VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_GROUP') AND COLUMN_NAME = upper('group_inactive');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_GROUP ADD group_inactive NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_GROUP') AND COLUMN_NAME = upper('group_option1');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_GROUP ADD group_option1 NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_GROUP') AND COLUMN_NAME = upper('group_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_GROUP ADD group_type NUMBER(10) DEFAULT 1  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_GROUP') AND COLUMN_NAME = upper('group_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_GROUP ADD group_remark VARCHAR2(200)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_GROUP') AND COLUMN_NAME = upper('creator');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_GROUP ADD creator VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_GROUP') AND COLUMN_NAME = upper('cdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_GROUP ADD cdate DATE'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_GROUP') AND COLUMN_NAME = upper('modifier');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_GROUP ADD modifier VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_GROUP') AND COLUMN_NAME = upper('mdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_GROUP ADD mdate DATE'; 
	END IF;

	execute immediate 'comment on column ST_GROUP.office_id is ''用户组所属机构ID''';
	execute immediate 'comment on column ST_GROUP.group_key is ''用户组标识''';
	execute immediate 'comment on column ST_GROUP.group_name is ''用户组名称''';
	execute immediate 'comment on column ST_GROUP.group_inactive is ''是否禁用''';
	execute immediate 'comment on column ST_GROUP.group_option1 is ''下级可见|选项1：下级机构是否可见，默认不可见''';
	execute immediate 'comment on column ST_GROUP.group_type is ''用户组类型|-1:开发组;0:系统内置组,例如管理员组; 1:用户自定义组''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_GROUP');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_GROUP ADD CONSTRAINT PK_ST_GROUP PRIMARY KEY(group_key)';
	END IF; 
END;
/ 

-- TABLE: ST_GROUP_USER; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_GROUP_USER');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_GROUP_USER ( 
					group_key VARCHAR2(30),
					user_key VARCHAR2(30)
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_GROUP_USER') AND COLUMN_NAME = upper('group_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_GROUP_USER ADD group_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_GROUP_USER') AND COLUMN_NAME = upper('user_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_GROUP_USER ADD user_key VARCHAR2(30) NOT NULL'; 
	END IF;


	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_GROUP_USER');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_GROUP_USER ADD CONSTRAINT PK_ST_GROUP_USER PRIMARY KEY(group_key,user_key)';
	END IF; 
END;
/ 

-- TABLE: ST_INDEX_FIELD; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_INDEX_FIELD');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_INDEX_FIELD ( 
					table_key VARCHAR2(52),
					index_name VARCHAR2(30),
					field_name VARCHAR2(30),
					is_unique NUMBER(10),
					index_type NUMBER(10)
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_INDEX_FIELD') AND COLUMN_NAME = upper('table_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_INDEX_FIELD ADD table_key VARCHAR2(52) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_INDEX_FIELD') AND COLUMN_NAME = upper('index_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_INDEX_FIELD ADD index_name VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_INDEX_FIELD') AND COLUMN_NAME = upper('field_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_INDEX_FIELD ADD field_name VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_INDEX_FIELD') AND COLUMN_NAME = upper('is_unique');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_INDEX_FIELD ADD is_unique NUMBER(10) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_INDEX_FIELD') AND COLUMN_NAME = upper('index_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_INDEX_FIELD ADD index_type NUMBER(10) NOT NULL'; 
	END IF;


	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_INDEX_FIELD');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_INDEX_FIELD ADD CONSTRAINT PK_ST_INDEX_FIELD PRIMARY KEY(field_name,index_name,table_key)';
	END IF; 
END;
/ 

-- TABLE: ST_LOG; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_LOG');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_LOG ( 
					log_id NUMBER(10),
					log_time DATE,
					log_type VARCHAR2(10),
					log_user_key VARCHAR2(20),
					log_bus_type VARCHAR2(20),
					log_desc VARCHAR2(512)
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_LOG') AND COLUMN_NAME = upper('log_id');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_LOG ADD log_id NUMBER(10) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_LOG') AND COLUMN_NAME = upper('log_time');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_LOG ADD log_time DATE DEFAULT getdate()  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_LOG') AND COLUMN_NAME = upper('log_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_LOG ADD log_type VARCHAR2(10) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_LOG') AND COLUMN_NAME = upper('log_user_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_LOG ADD log_user_key VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_LOG') AND COLUMN_NAME = upper('log_bus_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_LOG ADD log_bus_type VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_LOG') AND COLUMN_NAME = upper('log_desc');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_LOG ADD log_desc VARCHAR2(512) NOT NULL'; 
	END IF;

	execute immediate 'comment on column ST_LOG.log_time is ''日志时间|数据库时间''';
	execute immediate 'comment on column ST_LOG.log_type is ''日志类型|info、error、warn、debug''';
	execute immediate 'comment on column ST_LOG.log_bus_type is ''业务类型''';
	execute immediate 'comment on column ST_LOG.log_desc is ''日志描述''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_LOG');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_LOG ADD CONSTRAINT PK_ST_LOG PRIMARY KEY(log_id)';
	END IF; 
END;
/ 

-- TABLE: ST_MENU; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_MENU');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_MENU ( 
					pnode_key VARCHAR2(9),
					node_key VARCHAR2(12),
					menu_key VARCHAR2(30),
					menu_text VARCHAR2(50),
					menu_client_type NUMBER(10),
					menu_type VARCHAR2(20),
					menu_type_value VARCHAR2(30),
					menu_parameter VARCHAR2(100),
					flow_key VARCHAR2(30),
					menu_filter_first NUMBER(10),
					menu_filter_must NUMBER(10),
					menu_url VARCHAR2(100),
					menu_tooltip VARCHAR2(30),
					menu_display VARCHAR2(100),
					menu_icon VARCHAR2(20),
					menu_onlyone NUMBER(10),
					menu_inactive NUMBER(10),
					menu_order VARCHAR2(3),
					menu_sort VARCHAR2(50),
					menu_remark VARCHAR2(200),
					creator VARCHAR2(20),
					cdate DATE,
					modifier VARCHAR2(20),
					mdate DATE
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('pnode_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD pnode_key VARCHAR2(9) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('node_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD node_key VARCHAR2(12) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('menu_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD menu_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('menu_text');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD menu_text VARCHAR2(50) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('menu_client_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD menu_client_type NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('menu_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD menu_type VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('menu_type_value');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD menu_type_value VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('menu_parameter');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD menu_parameter VARCHAR2(100)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('flow_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD flow_key VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('menu_filter_first');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD menu_filter_first NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('menu_filter_must');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD menu_filter_must NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('menu_url');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD menu_url VARCHAR2(100)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('menu_tooltip');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD menu_tooltip VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('menu_display');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD menu_display VARCHAR2(100)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('menu_icon');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD menu_icon VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('menu_onlyone');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD menu_onlyone NUMBER(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('menu_inactive');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD menu_inactive NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('menu_order');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD menu_order VARCHAR2(3) DEFAULT ''999''  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('menu_sort');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD menu_sort VARCHAR2(50)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('menu_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD menu_remark VARCHAR2(200)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('creator');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD creator VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('cdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD cdate DATE'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('modifier');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD modifier VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU') AND COLUMN_NAME = upper('mdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD mdate DATE'; 
	END IF;

	execute immediate 'comment on column ST_MENU.pnode_key is ''父节点key值|一级菜单父节点key值为子系统key''';
	execute immediate 'comment on column ST_MENU.node_key is ''节点key值|key值决定了菜单顺序，不建议手工操作，应通过界面调整''';
	execute immediate 'comment on column ST_MENU.menu_key is ''菜单标识|用于程序调用及权限设置时使用，手工保证值唯一''';
	execute immediate 'comment on column ST_MENU.menu_text is ''菜单标题''';
	execute immediate 'comment on column ST_MENU.menu_client_type is ''客户端类型|0：PC端菜单，1：微信端菜单''';
	execute immediate 'comment on column ST_MENU.menu_type is ''菜单类型|window、modal、fullwindow、uview、reprot and etc.''';
	execute immediate 'comment on column ST_MENU.menu_type_value is ''菜单类型对应的值|例如：视图名称、报表名称l等''';
	execute immediate 'comment on column ST_MENU.menu_parameter is ''菜单参数|例如为调用的视图增加条件''';
	execute immediate 'comment on column ST_MENU.flow_key is ''流程ID''';
	execute immediate 'comment on column ST_MENU.menu_filter_first is ''先筛选''';
	execute immediate 'comment on column ST_MENU.menu_filter_must is ''必须有筛选''';
	execute immediate 'comment on column ST_MENU.menu_url is ''url|视图对应的编辑窗口、普通窗口url等''';
	execute immediate 'comment on column ST_MENU.menu_tooltip is ''菜单提示条''';
	execute immediate 'comment on column ST_MENU.menu_display is ''菜单功能描述''';
	execute immediate 'comment on column ST_MENU.menu_icon is ''菜单图标''';
	execute immediate 'comment on column ST_MENU.menu_onlyone is ''只能同时打开一个|该菜单调用的功能不允许并行运行多个''';
	execute immediate 'comment on column ST_MENU.menu_inactive is ''是否禁用|1：禁用，0：启用''';
	execute immediate 'comment on column ST_MENU.menu_order is ''菜单序号''';
	execute immediate 'comment on column ST_MENU.menu_sort is ''框架排序用|该字段准备废弃不用，菜单排序参考视图SV_MENU''';
	execute immediate 'comment on column ST_MENU.menu_remark is ''备注''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_MENU');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU ADD CONSTRAINT PK_ST_MENU PRIMARY KEY(menu_key)';
	END IF; 
	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('IX_ST_MENU_node_key');
	IF (num1 = 0) THEN 
		execute immediate 'CREATE UNIQUE INDEX IX_ST_MENU_node_key on ST_MENU(node_key)';
	END IF; 
END;
/ 

-- TABLE: ST_MENU_ACL; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_MENU_ACL');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_MENU_ACL ( 
					menu_key VARCHAR2(30),
					ug_key VARCHAR2(30),
					ug_type VARCHAR2(1),
					menu_acl_value NUMBER(10)
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU_ACL') AND COLUMN_NAME = upper('menu_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU_ACL ADD menu_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU_ACL') AND COLUMN_NAME = upper('ug_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU_ACL ADD ug_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU_ACL') AND COLUMN_NAME = upper('ug_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU_ACL ADD ug_type VARCHAR2(1) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_MENU_ACL') AND COLUMN_NAME = upper('menu_acl_value');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU_ACL ADD menu_acl_value NUMBER(10) NOT NULL'; 
	END IF;

	execute immediate 'comment on column ST_MENU_ACL.ug_key is ''用户（组）标识''';
	execute immediate 'comment on column ST_MENU_ACL.ug_type is ''用户、用户组标志|U：用户，G：用户组''';
	execute immediate 'comment on column ST_MENU_ACL.menu_acl_value is ''对菜单的访问权限|1：有访问权限，2：部分访问权限''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_MENU_ACL');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_MENU_ACL ADD CONSTRAINT PK_ST_MENU_ACL PRIMARY KEY(menu_key,ug_key,ug_type)';
	END IF; 
	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('IX_ST_MENU_ACL_menu_key');
	IF (num1 = 0) THEN 
		execute immediate 'CREATE INDEX IX_ST_MENU_ACL_menu_key on ST_MENU_ACL(menu_key)';
	END IF; 
	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('IX_ST_MENU_ACL_ug');
	IF (num1 = 0) THEN 
		execute immediate 'CREATE INDEX IX_ST_MENU_ACL_ug on ST_MENU_ACL(ug_type,ug_key)';
	END IF; 
END;
/ 

-- TABLE: ST_OFFICE; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_OFFICE');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_OFFICE ( 
					poffice_id NUMBER(10),
					office_id NUMBER(10),
					office_name VARCHAR2(50),
					office_shortname VARCHAR2(30),
					office_fullname VARCHAR2(100),
					node_key VARCHAR2(21),
					office_code VARCHAR2(20),
					office_level_type NUMBER(10),
					office_type NUMBER(10),
					office_is_last_level NUMBER(10),
					office_hide NUMBER(10),
					office1_id NUMBER(10),
					office1_name VARCHAR2(30),
					office2_id NUMBER(10),
					office2_name VARCHAR2(30),
					office3_id NUMBER(10),
					office3_name VARCHAR2(30),
					office_order NUMBER(10),
					office_full_order VARCHAR2(27),
					office_remark VARCHAR2(100),
					creator VARCHAR2(20),
					cdate DATE,
					modifier VARCHAR2(20),
					mdate DATE,
					deletor VARCHAR2(20),
					ddate DATE,
					del_tag NUMBER(10)
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('poffice_id');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD poffice_id NUMBER(10) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('office_id');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD office_id NUMBER(10) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('office_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD office_name VARCHAR2(50) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('office_shortname');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD office_shortname VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('office_fullname');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD office_fullname VARCHAR2(100)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('node_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD node_key VARCHAR2(21)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('office_code');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD office_code VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('office_level_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD office_level_type NUMBER(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('office_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD office_type NUMBER(10) DEFAULT 0 '; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('office_is_last_level');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD office_is_last_level NUMBER(10) DEFAULT 1  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('office_hide');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD office_hide NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('office1_id');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD office1_id NUMBER(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('office1_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD office1_name VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('office2_id');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD office2_id NUMBER(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('office2_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD office2_name VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('office3_id');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD office3_id NUMBER(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('office3_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD office3_name VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('office_order');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD office_order NUMBER(10) DEFAULT 999  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('office_full_order');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD office_full_order VARCHAR2(27)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('office_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD office_remark VARCHAR2(100)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('creator');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD creator VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('cdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD cdate DATE'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('modifier');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD modifier VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('mdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD mdate DATE'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('deletor');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD deletor VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('ddate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD ddate DATE'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE') AND COLUMN_NAME = upper('del_tag');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD del_tag NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;

	execute immediate 'comment on column ST_OFFICE.poffice_id is ''上级机构ID''';
	execute immediate 'comment on column ST_OFFICE.office_name is ''机构名称''';
	execute immediate 'comment on column ST_OFFICE.office_shortname is ''机构简称''';
	execute immediate 'comment on column ST_OFFICE.office_fullname is ''机构全称|机构完整层级路径''';
	execute immediate 'comment on column ST_OFFICE.office_code is ''机构代码''';
	execute immediate 'comment on column ST_OFFICE.office_level_type is ''机构级别类型|示例：0：集团；1：企业；2：一级部门；3：二级部门''';
	execute immediate 'comment on column ST_OFFICE.office_type is ''机构类型|示例：0：内部机构；1：供应商机构；2：客户机构''';
	execute immediate 'comment on column ST_OFFICE.office_is_last_level is ''是否末级机构''';
	execute immediate 'comment on column ST_OFFICE.office_hide is ''禁用''';
	execute immediate 'comment on column ST_OFFICE.office1_id is ''1级机构ID''';
	execute immediate 'comment on column ST_OFFICE.office1_name is ''1级机构名称''';
	execute immediate 'comment on column ST_OFFICE.office_order is ''序号''';
	execute immediate 'comment on column ST_OFFICE.office_full_order is ''全排列序号''';
	execute immediate 'comment on column ST_OFFICE.office_remark is ''备注''';
	execute immediate 'comment on column ST_OFFICE.deletor is ''删除人''';
	execute immediate 'comment on column ST_OFFICE.ddate is ''删除时间''';
	execute immediate 'comment on column ST_OFFICE.del_tag is ''删除标志''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_OFFICE');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE ADD CONSTRAINT PK_ST_OFFICE PRIMARY KEY(office_id)';
	END IF; 
	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('IX_ST_OFFICE_node_key');
	IF (num1 = 0) THEN 
		execute immediate 'CREATE UNIQUE INDEX IX_ST_OFFICE_node_key on ST_OFFICE(node_key)';
	END IF; 
	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('IX_ST_OFFICE_office1_id');
	IF (num1 = 0) THEN 
		execute immediate 'CREATE INDEX IX_ST_OFFICE_office1_id on ST_OFFICE(office1_id)';
	END IF; 
	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('IX_ST_OFFICE_office2_id');
	IF (num1 = 0) THEN 
		execute immediate 'CREATE INDEX IX_ST_OFFICE_office2_id on ST_OFFICE(office2_id)';
	END IF; 
	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('IX_ST_OFFICE_office3_id');
	IF (num1 = 0) THEN 
		execute immediate 'CREATE INDEX IX_ST_OFFICE_office3_id on ST_OFFICE(office3_id)';
	END IF; 
	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('IX_ST_OFFICE_poffice_id');
	IF (num1 = 0) THEN 
		execute immediate 'CREATE INDEX IX_ST_OFFICE_poffice_id on ST_OFFICE(poffice_id)';
	END IF; 
END;
/ 

-- TABLE: ST_OFFICE_LEVEL_TYPE; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_OFFICE_LEVEL_TYPE');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_OFFICE_LEVEL_TYPE ( 
					office_level_type NUMBER(10),
					office_level_type_name VARCHAR2(30)
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE_LEVEL_TYPE') AND COLUMN_NAME = upper('office_level_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE_LEVEL_TYPE ADD office_level_type NUMBER(10) DEFAULT 1  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE_LEVEL_TYPE') AND COLUMN_NAME = upper('office_level_type_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE_LEVEL_TYPE ADD office_level_type_name VARCHAR2(30) NOT NULL'; 
	END IF;

	execute immediate 'comment on column ST_OFFICE_LEVEL_TYPE.office_level_type is ''机构级别|用户自定义机构类别，示例：0：集团；1：企业；2：分公司、一级部门；3：二级部门''';
	execute immediate 'comment on column ST_OFFICE_LEVEL_TYPE.office_level_type_name is ''机构级别名称''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_OFFICE_LEVEL_TYPE');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE_LEVEL_TYPE ADD CONSTRAINT PK_ST_OFFICE_LEVEL_TYPE PRIMARY KEY(office_level_type)';
	END IF; 
END;
/ 

-- TABLE: ST_OFFICE_TYPE; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_OFFICE_TYPE');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_OFFICE_TYPE ( 
					office_type NUMBER(10),
					office_type_name VARCHAR2(30)
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE_TYPE') AND COLUMN_NAME = upper('office_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE_TYPE ADD office_type NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_OFFICE_TYPE') AND COLUMN_NAME = upper('office_type_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE_TYPE ADD office_type_name VARCHAR2(30) NOT NULL'; 
	END IF;

	execute immediate 'comment on column ST_OFFICE_TYPE.office_type is ''机构类别|用户自定义机构类别，示例：0：内部机构；6：供应商机构；7：客户机构''';
	execute immediate 'comment on column ST_OFFICE_TYPE.office_type_name is ''机构类别名称''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_OFFICE_TYPE');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_OFFICE_TYPE ADD CONSTRAINT PK_ST_OFFICE_TYPE PRIMARY KEY(office_type)';
	END IF; 
END;
/ 

-- TABLE: ST_PARAMETER; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_PARAMETER');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_PARAMETER ( 
					catalog_key VARCHAR2(20),
					parameter_key VARCHAR2(30),
					parameter_name VARCHAR2(50),
					parameter_type VARCHAR2(10),
					parameter_order NUMBER(10),
					parameter_remark VARCHAR2(200),
					creator VARCHAR2(20),
					cdate DATE,
					modifier VARCHAR2(20),
					mdate DATE
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER') AND COLUMN_NAME = upper('catalog_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER ADD catalog_key VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER') AND COLUMN_NAME = upper('parameter_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER ADD parameter_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER') AND COLUMN_NAME = upper('parameter_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER ADD parameter_name VARCHAR2(50) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER') AND COLUMN_NAME = upper('parameter_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER ADD parameter_type VARCHAR2(10) DEFAULT ''o''  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER') AND COLUMN_NAME = upper('parameter_order');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER ADD parameter_order NUMBER(10) DEFAULT 999  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER') AND COLUMN_NAME = upper('parameter_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER ADD parameter_remark VARCHAR2(200)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER') AND COLUMN_NAME = upper('creator');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER ADD creator VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER') AND COLUMN_NAME = upper('cdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER ADD cdate DATE NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER') AND COLUMN_NAME = upper('modifier');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER ADD modifier VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER') AND COLUMN_NAME = upper('mdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER ADD mdate DATE'; 
	END IF;

	execute immediate 'comment on column ST_PARAMETER.catalog_key is ''参数类别标识|外键=ST_PARAMETER_CATALOG.catalog_key''';
	execute immediate 'comment on column ST_PARAMETER.parameter_key is ''参数标识''';
	execute immediate 'comment on column ST_PARAMETER.parameter_name is ''参数名称''';
	execute immediate 'comment on column ST_PARAMETER.parameter_type is ''参数类型|g：全局参数，e：企业参数，o：其它参数（不统一维护）''';
	execute immediate 'comment on column ST_PARAMETER.parameter_order is ''序号''';
	execute immediate 'comment on column ST_PARAMETER.parameter_remark is ''备注''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_PARAMETER');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER ADD CONSTRAINT PK_ST_PARAMETER PRIMARY KEY(parameter_key)';
	END IF; 
	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('IX_ST_PARAMETER');
	IF (num1 = 0) THEN 
		execute immediate 'CREATE INDEX IX_ST_PARAMETER on ST_PARAMETER(catalog_key)';
	END IF; 
END;
/ 

-- TABLE: ST_PARAMETER_CATALOG; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_PARAMETER_CATALOG');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_PARAMETER_CATALOG ( 
					catalog_key VARCHAR2(20),
					catalog_name VARCHAR2(50),
					catalog_order NUMBER(10),
					catalog_remark VARCHAR2(100),
					creator VARCHAR2(20),
					cdate DATE,
					modifier VARCHAR2(20),
					mdate DATE
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER_CATALOG') AND COLUMN_NAME = upper('catalog_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_CATALOG ADD catalog_key VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER_CATALOG') AND COLUMN_NAME = upper('catalog_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_CATALOG ADD catalog_name VARCHAR2(50) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER_CATALOG') AND COLUMN_NAME = upper('catalog_order');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_CATALOG ADD catalog_order NUMBER(10) DEFAULT 999  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER_CATALOG') AND COLUMN_NAME = upper('catalog_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_CATALOG ADD catalog_remark VARCHAR2(100)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER_CATALOG') AND COLUMN_NAME = upper('creator');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_CATALOG ADD creator VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER_CATALOG') AND COLUMN_NAME = upper('cdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_CATALOG ADD cdate DATE NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER_CATALOG') AND COLUMN_NAME = upper('modifier');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_CATALOG ADD modifier VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER_CATALOG') AND COLUMN_NAME = upper('mdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_CATALOG ADD mdate DATE'; 
	END IF;

	execute immediate 'comment on column ST_PARAMETER_CATALOG.catalog_key is ''参数类别标识''';
	execute immediate 'comment on column ST_PARAMETER_CATALOG.catalog_name is ''参数类别名称''';
	execute immediate 'comment on column ST_PARAMETER_CATALOG.catalog_order is ''序号''';
	execute immediate 'comment on column ST_PARAMETER_CATALOG.catalog_remark is ''备注''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_PARAMETER_CATALOG');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_CATALOG ADD CONSTRAINT PK_ST_PARAMETER_CATALOG PRIMARY KEY(catalog_key)';
	END IF; 
END;
/ 

-- TABLE: ST_PARAMETER_VALUE; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_PARAMETER_VALUE');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_PARAMETER_VALUE ( 
					eoid NUMBER(10),
					parameter_key VARCHAR2(30),
					parameter_value_id NUMBER(10),
					parameter_value VARCHAR2(50),
					parameter_value1 VARCHAR2(50),
					parameter_value2 VARCHAR2(50),
					parameter_value3 VARCHAR2(50),
					parameter_value_order NUMBER(10),
					parameter_value_remark VARCHAR2(100),
					creator VARCHAR2(20),
					cdate DATE,
					modifier VARCHAR2(20),
					mdate DATE
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER_VALUE') AND COLUMN_NAME = upper('eoid');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_VALUE ADD eoid NUMBER(10) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER_VALUE') AND COLUMN_NAME = upper('parameter_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_VALUE ADD parameter_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER_VALUE') AND COLUMN_NAME = upper('parameter_value_id');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_VALUE ADD parameter_value_id NUMBER(10) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER_VALUE') AND COLUMN_NAME = upper('parameter_value');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_VALUE ADD parameter_value VARCHAR2(50) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER_VALUE') AND COLUMN_NAME = upper('parameter_value1');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_VALUE ADD parameter_value1 VARCHAR2(50)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER_VALUE') AND COLUMN_NAME = upper('parameter_value2');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_VALUE ADD parameter_value2 VARCHAR2(50)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER_VALUE') AND COLUMN_NAME = upper('parameter_value3');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_VALUE ADD parameter_value3 VARCHAR2(50)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER_VALUE') AND COLUMN_NAME = upper('parameter_value_order');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_VALUE ADD parameter_value_order NUMBER(10) DEFAULT 999  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER_VALUE') AND COLUMN_NAME = upper('parameter_value_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_VALUE ADD parameter_value_remark VARCHAR2(100)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER_VALUE') AND COLUMN_NAME = upper('creator');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_VALUE ADD creator VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER_VALUE') AND COLUMN_NAME = upper('cdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_VALUE ADD cdate DATE NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER_VALUE') AND COLUMN_NAME = upper('modifier');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_VALUE ADD modifier VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_PARAMETER_VALUE') AND COLUMN_NAME = upper('mdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_VALUE ADD mdate DATE'; 
	END IF;

	execute immediate 'comment on column ST_PARAMETER_VALUE.eoid is ''企业ID''';
	execute immediate 'comment on column ST_PARAMETER_VALUE.parameter_key is ''参数标识''';
	execute immediate 'comment on column ST_PARAMETER_VALUE.parameter_value_id is ''主键''';
	execute immediate 'comment on column ST_PARAMETER_VALUE.parameter_value is ''参数值''';
	execute immediate 'comment on column ST_PARAMETER_VALUE.parameter_value1 is ''参数值1''';
	execute immediate 'comment on column ST_PARAMETER_VALUE.parameter_value2 is ''参数值2''';
	execute immediate 'comment on column ST_PARAMETER_VALUE.parameter_value3 is ''参数值3''';
	execute immediate 'comment on column ST_PARAMETER_VALUE.parameter_value_order is ''序号''';
	execute immediate 'comment on column ST_PARAMETER_VALUE.parameter_value_remark is ''备注''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_PARAMETER_VALUE');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_PARAMETER_VALUE ADD CONSTRAINT PK_ST_PARAMETER_VALUE PRIMARY KEY(parameter_value_id)';
	END IF; 
	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('IX_ST_PARAMETER_VALUE');
	IF (num1 = 0) THEN 
		execute immediate 'CREATE UNIQUE INDEX IX_ST_PARAMETER_VALUE on ST_PARAMETER_VALUE(parameter_value,eoid,parameter_key)';
	END IF; 
	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('IX_ST_PARAMETER_VALUE_1');
	IF (num1 = 0) THEN 
		execute immediate 'CREATE INDEX IX_ST_PARAMETER_VALUE_1 on ST_PARAMETER_VALUE(parameter_key)';
	END IF; 
END;
/ 

-- TABLE: ST_REPORT; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_REPORT');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_REPORT ( 
					system_key VARCHAR2(20),
					report_key VARCHAR2(50),
					database_key VARCHAR2(20),
					report_title VARCHAR2(50),
					report_type NUMBER(10),
					report_data_source_type VARCHAR2(10),
					report_data_source VARCHAR2(1024),
					report_sum_count NUMBER(10),
					report_bottom VARCHAR2(50),
					report_paper_type VARCHAR2(20),
					report_remark VARCHAR2(200),
					creator VARCHAR2(30),
					cdate DATE,
					modifier VARCHAR2(30),
					mdate DATE
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT') AND COLUMN_NAME = upper('system_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT ADD system_key VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT') AND COLUMN_NAME = upper('report_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT ADD report_key VARCHAR2(50) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT') AND COLUMN_NAME = upper('database_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT ADD database_key VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT') AND COLUMN_NAME = upper('report_title');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT ADD report_title VARCHAR2(50) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT') AND COLUMN_NAME = upper('report_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT ADD report_type NUMBER(10) DEFAULT 1  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT') AND COLUMN_NAME = upper('report_data_source_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT ADD report_data_source_type VARCHAR2(10) DEFAULT ''sql''  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT') AND COLUMN_NAME = upper('report_data_source');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT ADD report_data_source VARCHAR2(1024) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT') AND COLUMN_NAME = upper('report_sum_count');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT ADD report_sum_count NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT') AND COLUMN_NAME = upper('report_bottom');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT ADD report_bottom VARCHAR2(50)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT') AND COLUMN_NAME = upper('report_paper_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT ADD report_paper_type VARCHAR2(20) DEFAULT ''A4'' '; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT') AND COLUMN_NAME = upper('report_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT ADD report_remark VARCHAR2(200)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT') AND COLUMN_NAME = upper('creator');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT ADD creator VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT') AND COLUMN_NAME = upper('cdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT ADD cdate DATE'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT') AND COLUMN_NAME = upper('modifier');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT ADD modifier VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT') AND COLUMN_NAME = upper('mdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT ADD mdate DATE'; 
	END IF;

	execute immediate 'comment on column ST_REPORT.report_key is ''报表标识''';
	execute immediate 'comment on column ST_REPORT.database_key is ''逻辑数据库''';
	execute immediate 'comment on column ST_REPORT.report_title is ''报表标题''';
	execute immediate 'comment on column ST_REPORT.report_type is ''报表类型|1：汇总表，0：明细表''';
	execute immediate 'comment on column ST_REPORT.report_data_source_type is ''数据源类型|sql，st_view''';
	execute immediate 'comment on column ST_REPORT.report_data_source is ''数据源|sql：SQL语句，st_view：数据视图''';
	execute immediate 'comment on column ST_REPORT.report_sum_count is ''行合计层数|-1：无合计；0：仅总计；1：分计；2：小计...''';
	execute immediate 'comment on column ST_REPORT.report_bottom is ''报表脚注''';
	execute immediate 'comment on column ST_REPORT.report_paper_type is ''纸张类型''';
	execute immediate 'comment on column ST_REPORT.report_remark is ''备注说明''';
	execute immediate 'comment on column ST_REPORT.creator is ''创建者''';
	execute immediate 'comment on column ST_REPORT.cdate is ''创建时间''';
	execute immediate 'comment on column ST_REPORT.modifier is ''最后修改人''';
	execute immediate 'comment on column ST_REPORT.mdate is ''最后修改时间''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_REPORT');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT ADD CONSTRAINT PK_ST_REPORT PRIMARY KEY(report_key)';
	END IF; 
END;
/ 

-- TABLE: ST_REPORT_COLUMN; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_REPORT_COLUMN');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_REPORT_COLUMN ( 
					report_key VARCHAR2(50),
					report_column_key VARCHAR2(30),
					rc_under_key VARCHAR2(30),
					rc_sort_key VARCHAR2(30),
					rc_name VARCHAR2(30),
					rc_rdc_type VARCHAR2(3),
					rc_rdc VARCHAR2(1),
					rc_index NUMBER(10),
					rc_selected NUMBER(10),
					rc_fieldtype VARCHAR2(20),
					rc_datatype VARCHAR2(20),
					rc_is_formula_col NUMBER(10),
					rc_formula VARCHAR2(200),
					rc_formula_row VARCHAR2(20),
					rc_formula_col VARCHAR2(20),
					rc_formula_col_count NUMBER(10),
					rc_formula_row_col VARCHAR2(1),
					rc_width NUMBER(10),
					rc_format VARCHAR2(20),
					rc_format_xls VARCHAR2(20),
					rc_allow_config NUMBER(10)
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT_COLUMN') AND COLUMN_NAME = upper('report_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD report_key VARCHAR2(50) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT_COLUMN') AND COLUMN_NAME = upper('report_column_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD report_column_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT_COLUMN') AND COLUMN_NAME = upper('rc_under_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD rc_under_key VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT_COLUMN') AND COLUMN_NAME = upper('rc_sort_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD rc_sort_key VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT_COLUMN') AND COLUMN_NAME = upper('rc_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD rc_name VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT_COLUMN') AND COLUMN_NAME = upper('rc_rdc_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD rc_rdc_type VARCHAR2(3) DEFAULT ''RDC''  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT_COLUMN') AND COLUMN_NAME = upper('rc_rdc');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD rc_rdc VARCHAR2(1) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT_COLUMN') AND COLUMN_NAME = upper('rc_index');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD rc_index NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT_COLUMN') AND COLUMN_NAME = upper('rc_selected');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD rc_selected NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT_COLUMN') AND COLUMN_NAME = upper('rc_fieldtype');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD rc_fieldtype VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT_COLUMN') AND COLUMN_NAME = upper('rc_datatype');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD rc_datatype VARCHAR2(20) DEFAULT ''String''  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT_COLUMN') AND COLUMN_NAME = upper('rc_is_formula_col');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD rc_is_formula_col NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT_COLUMN') AND COLUMN_NAME = upper('rc_formula');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD rc_formula VARCHAR2(200)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT_COLUMN') AND COLUMN_NAME = upper('rc_formula_row');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD rc_formula_row VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT_COLUMN') AND COLUMN_NAME = upper('rc_formula_col');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD rc_formula_col VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT_COLUMN') AND COLUMN_NAME = upper('rc_formula_col_count');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD rc_formula_col_count NUMBER(10) DEFAULT -1 '; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT_COLUMN') AND COLUMN_NAME = upper('rc_formula_row_col');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD rc_formula_row_col VARCHAR2(1)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT_COLUMN') AND COLUMN_NAME = upper('rc_width');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD rc_width NUMBER(10) DEFAULT 80 '; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT_COLUMN') AND COLUMN_NAME = upper('rc_format');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD rc_format VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT_COLUMN') AND COLUMN_NAME = upper('rc_format_xls');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD rc_format_xls VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_REPORT_COLUMN') AND COLUMN_NAME = upper('rc_allow_config');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD rc_allow_config NUMBER(10) DEFAULT 1  NOT NULL'; 
	END IF;

	execute immediate 'comment on column ST_REPORT_COLUMN.report_key is ''报表名称''';
	execute immediate 'comment on column ST_REPORT_COLUMN.report_column_key is ''显示字段标识''';
	execute immediate 'comment on column ST_REPORT_COLUMN.rc_under_key is ''底层字段标识|显示为中文值，底层实际为关键字字段值''';
	execute immediate 'comment on column ST_REPORT_COLUMN.rc_sort_key is ''排序字段标识''';
	execute immediate 'comment on column ST_REPORT_COLUMN.rc_name is ''字段名称''';
	execute immediate 'comment on column ST_REPORT_COLUMN.rc_rdc_type is ''允许配置的区域类型|R：行分组区，D：数据区，C：列分组区''';
	execute immediate 'comment on column ST_REPORT_COLUMN.rc_rdc is ''区域位置''';
	execute immediate 'comment on column ST_REPORT_COLUMN.rc_index is ''序号|从左到右，从上到下''';
	execute immediate 'comment on column ST_REPORT_COLUMN.rc_selected is ''输出标志''';
	execute immediate 'comment on column ST_REPORT_COLUMN.rc_fieldtype is ''字段类型|string、number、datetime等''';
	execute immediate 'comment on column ST_REPORT_COLUMN.rc_datatype is ''数据类型|varchar、int、float等''';
	execute immediate 'comment on column ST_REPORT_COLUMN.rc_is_formula_col is ''是否公式列|1：是；0：否''';
	execute immediate 'comment on column ST_REPORT_COLUMN.rc_formula is ''单元格列公式表达式|后缀表达式(e.g. =,/,金额,数量)或常量''';
	execute immediate 'comment on column ST_REPORT_COLUMN.rc_formula_row is ''行分组组公式|sum、AVERAGE、count''';
	execute immediate 'comment on column ST_REPORT_COLUMN.rc_formula_col is ''列分组组公式|sum、avg、count''';
	execute immediate 'comment on column ST_REPORT_COLUMN.rc_formula_col_count is ''列公式层数|当前字段列公式层数，-1：不合计；0：仅总计；1：分计；2：小计...''';
	execute immediate 'comment on column ST_REPORT_COLUMN.rc_formula_row_col is ''行列分组交叉单元格公式|R：行公式；C：列公式；N：无公式''';
	execute immediate 'comment on column ST_REPORT_COLUMN.rc_width is ''字段宽度''';
	execute immediate 'comment on column ST_REPORT_COLUMN.rc_format is ''显示格式''';
	execute immediate 'comment on column ST_REPORT_COLUMN.rc_format_xls is ''Excel显示格式''';
	execute immediate 'comment on column ST_REPORT_COLUMN.rc_allow_config is ''允许配置|例如：ID列，排序列等不允许配置，不显示在配置界面上''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_REPORT_COLUMN');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_REPORT_COLUMN ADD CONSTRAINT PK_ST_REPORT_COLUMN PRIMARY KEY(report_column_key,report_key)';
	END IF; 
	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('IX_ST_REPORT_COLUMN_report_key');
	IF (num1 = 0) THEN 
		execute immediate 'CREATE INDEX IX_ST_REPORT_COLUMN_report_key on ST_REPORT_COLUMN(report_key)';
	END IF; 
END;
/ 

-- TABLE: ST_SYS_PARA; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_SYS_PARA');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_SYS_PARA ( 
					sys_para_key VARCHAR2(30),
					sys_para_name VARCHAR2(30),
					sys_para_value VARCHAR2(50),
					sys_para_remark VARCHAR2(200)
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_SYS_PARA') AND COLUMN_NAME = upper('sys_para_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_SYS_PARA ADD sys_para_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_SYS_PARA') AND COLUMN_NAME = upper('sys_para_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_SYS_PARA ADD sys_para_name VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_SYS_PARA') AND COLUMN_NAME = upper('sys_para_value');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_SYS_PARA ADD sys_para_value VARCHAR2(50) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_SYS_PARA') AND COLUMN_NAME = upper('sys_para_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_SYS_PARA ADD sys_para_remark VARCHAR2(200)'; 
	END IF;

	execute immediate 'comment on column ST_SYS_PARA.sys_para_key is ''参数标识''';
	execute immediate 'comment on column ST_SYS_PARA.sys_para_name is ''参数名称''';
	execute immediate 'comment on column ST_SYS_PARA.sys_para_value is ''参数值''';
	execute immediate 'comment on column ST_SYS_PARA.sys_para_remark is ''备注''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_SYS_PARA');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_SYS_PARA ADD CONSTRAINT PK_ST_SYS_PARA PRIMARY KEY(sys_para_key)';
	END IF; 
END;
/ 

-- TABLE: ST_SYSTEM; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_SYSTEM');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_SYSTEM ( 
					database_key VARCHAR2(20),
					system_key VARCHAR2(3),
					system_name VARCHAR2(20),
					system_package VARCHAR2(30),
					system_text VARCHAR2(20),
					system_version NUMBER(10),
					system_hide NUMBER(10),
					system_order NUMBER(10),
					system_remark VARCHAR2(200),
					creator VARCHAR2(20),
					cdate DATE,
					modifier VARCHAR2(20),
					mdate DATE
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_SYSTEM') AND COLUMN_NAME = upper('database_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_SYSTEM ADD database_key VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_SYSTEM') AND COLUMN_NAME = upper('system_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_SYSTEM ADD system_key VARCHAR2(3) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_SYSTEM') AND COLUMN_NAME = upper('system_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_SYSTEM ADD system_name VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_SYSTEM') AND COLUMN_NAME = upper('system_package');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_SYSTEM ADD system_package VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_SYSTEM') AND COLUMN_NAME = upper('system_text');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_SYSTEM ADD system_text VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_SYSTEM') AND COLUMN_NAME = upper('system_version');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_SYSTEM ADD system_version NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_SYSTEM') AND COLUMN_NAME = upper('system_hide');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_SYSTEM ADD system_hide NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_SYSTEM') AND COLUMN_NAME = upper('system_order');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_SYSTEM ADD system_order NUMBER(10) DEFAULT 999  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_SYSTEM') AND COLUMN_NAME = upper('system_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_SYSTEM ADD system_remark VARCHAR2(200)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_SYSTEM') AND COLUMN_NAME = upper('creator');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_SYSTEM ADD creator VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_SYSTEM') AND COLUMN_NAME = upper('cdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_SYSTEM ADD cdate DATE NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_SYSTEM') AND COLUMN_NAME = upper('modifier');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_SYSTEM ADD modifier VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_SYSTEM') AND COLUMN_NAME = upper('mdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_SYSTEM ADD mdate DATE'; 
	END IF;

	execute immediate 'comment on column ST_SYSTEM.database_key is ''默认数据库|逻辑数据库名称''';
	execute immediate 'comment on column ST_SYSTEM.system_key is ''子系统key值|多客户用多个系统库进行区分''';
	execute immediate 'comment on column ST_SYSTEM.system_name is ''子系统名称|前台子系统根目录''';
	execute immediate 'comment on column ST_SYSTEM.system_package is ''子系统类包|后台子系统根目录，默认值同system_name''';
	execute immediate 'comment on column ST_SYSTEM.system_text is ''系统简称|子系统标签显示的名称''';
	execute immediate 'comment on column ST_SYSTEM.system_version is ''子系统版本''';
	execute immediate 'comment on column ST_SYSTEM.system_hide is ''是否隐藏|0：显示，1：隐藏''';
	execute immediate 'comment on column ST_SYSTEM.system_order is ''系统排列顺序''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_SYSTEM');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_SYSTEM ADD CONSTRAINT PK_ST_SYSTEM PRIMARY KEY(system_key)';
	END IF; 
	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('IX_ST_SYSTEM_name');
	IF (num1 = 0) THEN 
		execute immediate 'CREATE UNIQUE INDEX IX_ST_SYSTEM_name on ST_SYSTEM(system_name)';
	END IF; 
END;
/ 

-- TABLE: ST_TABLE; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_TABLE');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_TABLE ( 
					database_key VARCHAR2(20),
					table_key VARCHAR2(52),
					table_name VARCHAR2(30),
					table_type VARCHAR2(1),
					table_text VARCHAR2(30),
					table_remark VARCHAR2(200),
					creator VARCHAR2(20),
					cdate DATE,
					modifier VARCHAR2(20),
					mdate DATE
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TABLE') AND COLUMN_NAME = upper('database_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TABLE ADD database_key VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TABLE') AND COLUMN_NAME = upper('table_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TABLE ADD table_key VARCHAR2(52) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TABLE') AND COLUMN_NAME = upper('table_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TABLE ADD table_name VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TABLE') AND COLUMN_NAME = upper('table_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TABLE ADD table_type VARCHAR2(1) DEFAULT ''U'' '; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TABLE') AND COLUMN_NAME = upper('table_text');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TABLE ADD table_text VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TABLE') AND COLUMN_NAME = upper('table_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TABLE ADD table_remark VARCHAR2(200)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TABLE') AND COLUMN_NAME = upper('creator');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TABLE ADD creator VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TABLE') AND COLUMN_NAME = upper('cdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TABLE ADD cdate DATE'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TABLE') AND COLUMN_NAME = upper('modifier');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TABLE ADD modifier VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TABLE') AND COLUMN_NAME = upper('mdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TABLE ADD mdate DATE'; 
	END IF;

	execute immediate 'comment on column ST_TABLE.table_name is ''对象物理名称''';
	execute immediate 'comment on column ST_TABLE.table_type is ''对象类型|U：表，V：视图''';
	execute immediate 'comment on column ST_TABLE.table_text is ''对象中文名称''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_TABLE');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TABLE ADD CONSTRAINT PK_ST_TABLE PRIMARY KEY(table_key)';
	END IF; 
END;
/ 

-- TABLE: ST_TREE; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_TREE');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_TREE ( 
					database_key VARCHAR2(20),
					tree_key VARCHAR2(30),
					tree_name VARCHAR2(30),
					tree_root_where VARCHAR2(256),
					tree_first_node_value VARCHAR2(30),
					tree_auto_expand NUMBER(10),
					tree_remark VARCHAR2(200),
					creator VARCHAR2(20),
					cdate DATE,
					modifier VARCHAR2(20),
					mdate DATE
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TREE') AND COLUMN_NAME = upper('database_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TREE ADD database_key VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TREE') AND COLUMN_NAME = upper('tree_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TREE ADD tree_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TREE') AND COLUMN_NAME = upper('tree_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TREE ADD tree_name VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TREE') AND COLUMN_NAME = upper('tree_root_where');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TREE ADD tree_root_where VARCHAR2(256)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TREE') AND COLUMN_NAME = upper('tree_first_node_value');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TREE ADD tree_first_node_value VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TREE') AND COLUMN_NAME = upper('tree_auto_expand');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TREE ADD tree_auto_expand NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TREE') AND COLUMN_NAME = upper('tree_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TREE ADD tree_remark VARCHAR2(200)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TREE') AND COLUMN_NAME = upper('creator');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TREE ADD creator VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TREE') AND COLUMN_NAME = upper('cdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TREE ADD cdate DATE'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TREE') AND COLUMN_NAME = upper('modifier');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TREE ADD modifier VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TREE') AND COLUMN_NAME = upper('mdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TREE ADD mdate DATE'; 
	END IF;

	execute immediate 'comment on column ST_TREE.tree_name is ''树名称''';
	execute immediate 'comment on column ST_TREE.tree_root_where is ''根节点时的视图条件|一般为空，即显示全部数据，也可以设置为不显示任何数据''';
	execute immediate 'comment on column ST_TREE.tree_first_node_value is ''根节点条件|例如：机构树为循环节点，首节点为当前用户所在机构。''';
	execute immediate 'comment on column ST_TREE.tree_auto_expand is ''是否自动展开第一级''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_TREE');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TREE ADD CONSTRAINT PK_ST_TREE PRIMARY KEY(tree_key)';
	END IF; 
END;
/ 

-- TABLE: ST_TREE_NODE; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_TREE_NODE');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_TREE_NODE ( 
					tree_key VARCHAR2(30),
					tree_node_level NUMBER(10),
					single_condition NUMBER(10),
					tree_node_field_type VARCHAR2(5),
					tree_node_field VARCHAR2(1024),
					tree_node_sql VARCHAR2(1024),
					tree_node_remark VARCHAR2(200)
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TREE_NODE') AND COLUMN_NAME = upper('tree_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TREE_NODE ADD tree_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TREE_NODE') AND COLUMN_NAME = upper('tree_node_level');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TREE_NODE ADD tree_node_level NUMBER(10) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TREE_NODE') AND COLUMN_NAME = upper('single_condition');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TREE_NODE ADD single_condition NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TREE_NODE') AND COLUMN_NAME = upper('tree_node_field_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TREE_NODE ADD tree_node_field_type VARCHAR2(5) DEFAULT ''field'' '; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TREE_NODE') AND COLUMN_NAME = upper('tree_node_field');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TREE_NODE ADD tree_node_field VARCHAR2(1024)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TREE_NODE') AND COLUMN_NAME = upper('tree_node_sql');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TREE_NODE ADD tree_node_sql VARCHAR2(1024) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_TREE_NODE') AND COLUMN_NAME = upper('tree_node_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TREE_NODE ADD tree_node_remark VARCHAR2(200)'; 
	END IF;

	execute immediate 'comment on column ST_TREE_NODE.tree_node_level is ''树节点层级''';
	execute immediate 'comment on column ST_TREE_NODE.single_condition is ''单一条件|导航条件是否为单一条件，默认为0：合并父节点条件，1：单一节点条件''';
	execute immediate 'comment on column ST_TREE_NODE.tree_node_field_type is ''导航字段类型|field：字段，sql：sql语句''';
	execute immediate 'comment on column ST_TREE_NODE.tree_node_field is ''本级节点导航条件|字段或SQL语句，%v%表示当前节点的值(node_value)''';
	execute immediate 'comment on column ST_TREE_NODE.tree_node_sql is ''节点数据源|node_value, node_text, node_title, sub_nodes and others，前四项为固定列名，sub_nodes可省''';
	execute immediate 'comment on column ST_TREE_NODE.tree_node_remark is ''备注''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_TREE_NODE');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_TREE_NODE ADD CONSTRAINT PK_ST_TREE_NODE PRIMARY KEY(tree_key,tree_node_level)';
	END IF; 
END;
/ 

-- TABLE: ST_USER; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_USER');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_USER ( 
					creator_office_id NUMBER(10),
					office_id NUMBER(10),
					user_key VARCHAR2(30),
					user_key_md5 VARCHAR2(32),
					user_name VARCHAR2(20),
					user_password VARCHAR2(32),
					user_type NUMBER(10),
					user_inactive NUMBER(10),
					user_account_manager NUMBER(10),
					user_privilege_manager NUMBER(10),
					user_id_card VARCHAR2(18),
					user_job_number VARCHAR2(20),
					user_mobile VARCHAR2(20),
					user_email VARCHAR2(30),
					user_remark VARCHAR2(200),
					creator VARCHAR2(20),
					cdate DATE,
					modifier VARCHAR2(20),
					mdate DATE
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_USER') AND COLUMN_NAME = upper('creator_office_id');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_USER ADD creator_office_id NUMBER(10) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_USER') AND COLUMN_NAME = upper('office_id');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_USER ADD office_id NUMBER(10) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_USER') AND COLUMN_NAME = upper('user_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_USER ADD user_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_USER') AND COLUMN_NAME = upper('user_key_md5');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_USER ADD user_key_md5 VARCHAR2(32)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_USER') AND COLUMN_NAME = upper('user_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_USER ADD user_name VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_USER') AND COLUMN_NAME = upper('user_password');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_USER ADD user_password VARCHAR2(32) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_USER') AND COLUMN_NAME = upper('user_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_USER ADD user_type NUMBER(10) DEFAULT 1  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_USER') AND COLUMN_NAME = upper('user_inactive');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_USER ADD user_inactive NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_USER') AND COLUMN_NAME = upper('user_account_manager');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_USER ADD user_account_manager NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_USER') AND COLUMN_NAME = upper('user_privilege_manager');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_USER ADD user_privilege_manager NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_USER') AND COLUMN_NAME = upper('user_id_card');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_USER ADD user_id_card VARCHAR2(18)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_USER') AND COLUMN_NAME = upper('user_job_number');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_USER ADD user_job_number VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_USER') AND COLUMN_NAME = upper('user_mobile');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_USER ADD user_mobile VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_USER') AND COLUMN_NAME = upper('user_email');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_USER ADD user_email VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_USER') AND COLUMN_NAME = upper('user_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_USER ADD user_remark VARCHAR2(200)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_USER') AND COLUMN_NAME = upper('creator');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_USER ADD creator VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_USER') AND COLUMN_NAME = upper('cdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_USER ADD cdate DATE'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_USER') AND COLUMN_NAME = upper('modifier');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_USER ADD modifier VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_USER') AND COLUMN_NAME = upper('mdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_USER ADD mdate DATE'; 
	END IF;

	execute immediate 'comment on column ST_USER.creator_office_id is ''当前用户创建人机构ID|例如：上级用户为下级机构创建的管理员账户，下级机构修改该账户''';
	execute immediate 'comment on column ST_USER.office_id is ''用户所属机构ID''';
	execute immediate 'comment on column ST_USER.user_key is ''用户登录名称|初次登录后user_key不允许再修改，永久固定''';
	execute immediate 'comment on column ST_USER.user_name is ''用户姓名''';
	execute immediate 'comment on column ST_USER.user_type is ''用户类型|-1:开发人员;0:系统内置用户,例如管理员; 1:用户自定义用户''';
	execute immediate 'comment on column ST_USER.user_inactive is ''是否禁用''';
	execute immediate 'comment on column ST_USER.user_account_manager is ''账户管理员''';
	execute immediate 'comment on column ST_USER.user_privilege_manager is ''权限管理员''';
	execute immediate 'comment on column ST_USER.user_id_card is ''身份证号|身份证号码或护照号码等''';
	execute immediate 'comment on column ST_USER.user_job_number is ''工号|工作证号码''';
	execute immediate 'comment on column ST_USER.user_mobile is ''手机号码''';
	execute immediate 'comment on column ST_USER.user_email is ''电子邮箱''';
	execute immediate 'comment on column ST_USER.user_remark is ''备注''';
	execute immediate 'comment on column ST_USER.creator is ''创建日期''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_USER');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_USER ADD CONSTRAINT PK_ST_USER PRIMARY KEY(user_key)';
	END IF; 
END;
/ 

-- TABLE: ST_VIEW; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_VIEW');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_VIEW ( 
					system_name VARCHAR2(20),
					database_key VARCHAR2(20),
					table_key VARCHAR2(52),
					table_name VARCHAR2(30),
					view_key VARCHAR2(30),
					view_name VARCHAR2(40),
					view_sql_select VARCHAR2(1024),
					view_sql_from VARCHAR2(512),
					view_sql_where VARCHAR2(512),
					view_sql_groupby VARCHAR2(256),
					view_sql_orderby VARCHAR2(128),
					view_fixed_columns NUMBER(10),
					view_float_columns NUMBER(10),
					view_allow_addnew NUMBER(10),
					view_allow_modify NUMBER(10),
					view_allow_delete NUMBER(10),
					view_allow_copy NUMBER(10),
					view_fn_view NUMBER(10),
					view_fn_view_name VARCHAR2(20),
					view_fn_select NUMBER(10),
					view_tree_width NUMBER(12,2),
					view_backup_table VARCHAR2(60),
					view_prohibit_export NUMBER(10),
					view_remark VARCHAR2(200),
					creator VARCHAR2(30),
					cdate DATE,
					modifier VARCHAR2(30),
					mdate DATE
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('system_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD system_name VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('database_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD database_key VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('table_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD table_key VARCHAR2(52) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('table_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD table_name VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('view_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD view_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('view_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD view_name VARCHAR2(40) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('view_sql_select');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD view_sql_select VARCHAR2(1024) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('view_sql_from');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD view_sql_from VARCHAR2(512) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('view_sql_where');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD view_sql_where VARCHAR2(512)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('view_sql_groupby');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD view_sql_groupby VARCHAR2(256)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('view_sql_orderby');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD view_sql_orderby VARCHAR2(128)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('view_fixed_columns');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD view_fixed_columns NUMBER(10) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('view_float_columns');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD view_float_columns NUMBER(10) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('view_allow_addnew');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD view_allow_addnew NUMBER(10) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('view_allow_modify');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD view_allow_modify NUMBER(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('view_allow_delete');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD view_allow_delete NUMBER(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('view_allow_copy');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD view_allow_copy NUMBER(10) DEFAULT 0 '; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('view_fn_view');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD view_fn_view NUMBER(10) DEFAULT 0 '; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('view_fn_view_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD view_fn_view_name VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('view_fn_select');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD view_fn_select NUMBER(10) DEFAULT 0 '; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('view_tree_width');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD view_tree_width NUMBER(12,2) DEFAULT 0.15  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('view_backup_table');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD view_backup_table VARCHAR2(60)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('view_prohibit_export');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD view_prohibit_export NUMBER(10) DEFAULT 0 '; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('view_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD view_remark VARCHAR2(200)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('creator');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD creator VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('cdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD cdate DATE'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('modifier');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD modifier VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW') AND COLUMN_NAME = upper('mdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD mdate DATE'; 
	END IF;

	execute immediate 'comment on column ST_VIEW.view_key is ''视图KEY|建议系统库按照客户或产品分开，以保证视图KEY唯一''';
	execute immediate 'comment on column ST_VIEW.view_name is ''视图名称''';
	execute immediate 'comment on column ST_VIEW.view_sql_select is ''SELECT 部分|不包括 SELECT 关键字''';
	execute immediate 'comment on column ST_VIEW.view_sql_from is ''FROM部分|不包括 FROM 关键字''';
	execute immediate 'comment on column ST_VIEW.view_sql_where is ''WHERE部分|不包括 WHERE 关键字''';
	execute immediate 'comment on column ST_VIEW.view_sql_groupby is ''GROYP BY AND HAVING|不包括GROUP BY 关键字，但是包括HAVING关键字''';
	execute immediate 'comment on column ST_VIEW.view_sql_orderby is ''ORDER BY部分|不包括 ORDER BY 关键字''';
	execute immediate 'comment on column ST_VIEW.view_fixed_columns is ''固定列列数|总列数超出(固定列+浮动列)部分为隐藏列''';
	execute immediate 'comment on column ST_VIEW.view_float_columns is ''浮动列列数|总列数超出(固定列+浮动列)部分为隐藏列''';
	execute immediate 'comment on column ST_VIEW.view_allow_addnew is ''允许添加||0：不允许；1：允许''';
	execute immediate 'comment on column ST_VIEW.view_allow_modify is ''允许修改''';
	execute immediate 'comment on column ST_VIEW.view_allow_delete is ''允许删除||0：不允许；1：允许''';
	execute immediate 'comment on column ST_VIEW.view_allow_copy is ''允许拷贝||0：不允许；1：允许''';
	execute immediate 'comment on column ST_VIEW.view_fn_view is ''是否添加查看列|0：不显示；1：显示''';
	execute immediate 'comment on column ST_VIEW.view_fn_view_name is ''编辑名称|编辑功能列的名称''';
	execute immediate 'comment on column ST_VIEW.view_fn_select is ''是否添加筛选列|0：不显示；1：单选；2：多选''';
	execute immediate 'comment on column ST_VIEW.view_tree_width is ''导航树默认宽度|大于1为实际宽度，小于1为百分比''';
	execute immediate 'comment on column ST_VIEW.view_backup_table is ''自动备份表''';
	execute immediate 'comment on column ST_VIEW.view_prohibit_export is ''禁止导出|禁止数据导出''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_VIEW');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW ADD CONSTRAINT PK_ST_VIEW PRIMARY KEY(view_key)';
	END IF; 
END;
/ 

-- TABLE: ST_VIEW_; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_VIEW_');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_VIEW_ ( 
					user_key VARCHAR2(20),
					view_key VARCHAR2(30),
					view_sql_select VARCHAR2(1024),
					view_fixed_columns NUMBER(10),
					view_float_columns NUMBER(10)
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_') AND COLUMN_NAME = upper('user_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_ ADD user_key VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_') AND COLUMN_NAME = upper('view_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_ ADD view_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_') AND COLUMN_NAME = upper('view_sql_select');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_ ADD view_sql_select VARCHAR2(1024) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_') AND COLUMN_NAME = upper('view_fixed_columns');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_ ADD view_fixed_columns NUMBER(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_') AND COLUMN_NAME = upper('view_float_columns');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_ ADD view_float_columns NUMBER(10)'; 
	END IF;

	execute immediate 'comment on column ST_VIEW_.view_sql_select is ''SELECT 部分|不包括 SELECT 关键字''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_VIEW_');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_ ADD CONSTRAINT PK_ST_VIEW_ PRIMARY KEY(user_key,view_key)';
	END IF; 
END;
/ 

-- TABLE: ST_VIEW_EXTRA; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_VIEW_EXTRA');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_VIEW_EXTRA ( 
					view_key VARCHAR2(30),
					menu_key VARCHAR2(30),
					view_extra_key VARCHAR2(30),
					view_extra_text VARCHAR2(30),
					view_extra_type VARCHAR2(5),
					view_extra_width NUMBER(10),
					view_extra_inactive NUMBER(10),
					view_extra_remark VARCHAR2(200),
					view_extra_order NUMBER(10),
					view_extra_form_url VARCHAR2(100)
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_EXTRA') AND COLUMN_NAME = upper('view_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_EXTRA ADD view_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_EXTRA') AND COLUMN_NAME = upper('menu_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_EXTRA ADD menu_key VARCHAR2(30) DEFAULT ''*''  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_EXTRA') AND COLUMN_NAME = upper('view_extra_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_EXTRA ADD view_extra_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_EXTRA') AND COLUMN_NAME = upper('view_extra_text');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_EXTRA ADD view_extra_text VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_EXTRA') AND COLUMN_NAME = upper('view_extra_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_EXTRA ADD view_extra_type VARCHAR2(5) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_EXTRA') AND COLUMN_NAME = upper('view_extra_width');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_EXTRA ADD view_extra_width NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_EXTRA') AND COLUMN_NAME = upper('view_extra_inactive');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_EXTRA ADD view_extra_inactive NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_EXTRA') AND COLUMN_NAME = upper('view_extra_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_EXTRA ADD view_extra_remark VARCHAR2(200)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_EXTRA') AND COLUMN_NAME = upper('view_extra_order');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_EXTRA ADD view_extra_order NUMBER(10) DEFAULT 999 '; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_EXTRA') AND COLUMN_NAME = upper('view_extra_form_url');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_EXTRA ADD view_extra_form_url VARCHAR2(100)'; 
	END IF;

	execute immediate 'comment on column ST_VIEW_EXTRA.menu_key is ''菜单标识|默认为*,表示为与调用菜单无关''';
	execute immediate 'comment on column ST_VIEW_EXTRA.view_extra_key is ''扩展功能标识''';
	execute immediate 'comment on column ST_VIEW_EXTRA.view_extra_text is ''扩展功能名称''';
	execute immediate 'comment on column ST_VIEW_EXTRA.view_extra_type is ''扩展功能类型|1：视图按钮；2：视图网格功能列；3：界面按钮''';
	execute immediate 'comment on column ST_VIEW_EXTRA.view_extra_width is ''宽度|默认值为0，由系统自动根据文本内容计算出合适的宽度''';
	execute immediate 'comment on column ST_VIEW_EXTRA.view_extra_inactive is ''禁用|默认为0''';
	execute immediate 'comment on column ST_VIEW_EXTRA.view_extra_remark is ''扩展功能说明''';
	execute immediate 'comment on column ST_VIEW_EXTRA.view_extra_form_url is ''弹出窗口url''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_VIEW_EXTRA');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_EXTRA ADD CONSTRAINT PK_ST_VIEW_EXTRA PRIMARY KEY(menu_key,view_extra_key,view_key)';
	END IF; 
END;
/ 

-- TABLE: ST_VIEW_FIELD; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_VIEW_FIELD');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_VIEW_FIELD ( 
					view_key VARCHAR2(30),
					table_key VARCHAR2(52),
					field_key VARCHAR2(82),
					field_name VARCHAR2(30),
					field_prefix VARCHAR2(30),
					field_text VARCHAR2(30),
					field_title VARCHAR2(50),
					field_type VARCHAR2(10),
					datatype VARCHAR2(20),
					field_length NUMBER(10),
					field_pkey NUMBER(10),
					field_identity NUMBER(10),
					field_nullable NUMBER(10),
					field_updatable NUMBER(10),
					field_editable NUMBER(10),
					field_default VARCHAR2(50),
					field_grid_control VARCHAR2(10),
					field_grid_format VARCHAR2(30),
					field_align VARCHAR2(10),
					field_pixel_width NUMBER(10),
					field_input_format VARCHAR2(30),
					field_validation_key VARCHAR2(30),
					field_control_type VARCHAR2(20),
					field_query_type VARCHAR2(10),
					field_query_key VARCHAR2(30),
					field_query_source VARCHAR2(500),
					field_query_order NUMBER(10),
					field_remark VARCHAR2(200),
					creator VARCHAR2(20),
					cdate DATE,
					modifier VARCHAR2(20),
					mdate DATE
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('view_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD view_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('table_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD table_key VARCHAR2(52)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_key VARCHAR2(82) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_name VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_prefix');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_prefix VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_text');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_text VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_title');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_title VARCHAR2(50)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_type VARCHAR2(10) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('datatype');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD datatype VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_length');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_length NUMBER(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_pkey');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_pkey NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_identity');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_identity NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_nullable');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_nullable NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_updatable');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_updatable NUMBER(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_editable');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_editable NUMBER(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_default');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_default VARCHAR2(50)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_grid_control');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_grid_control VARCHAR2(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_grid_format');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_grid_format VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_align');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_align VARCHAR2(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_pixel_width');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_pixel_width NUMBER(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_input_format');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_input_format VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_validation_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_validation_key VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_control_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_control_type VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_query_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_query_type VARCHAR2(10)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_query_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_query_key VARCHAR2(30)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_query_source');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_query_source VARCHAR2(500)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_query_order');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_query_order NUMBER(10) DEFAULT 999 '; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('field_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD field_remark VARCHAR2(200)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('creator');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD creator VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('cdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD cdate DATE'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('modifier');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD modifier VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_FIELD') AND COLUMN_NAME = upper('mdate');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD mdate DATE'; 
	END IF;

	execute immediate 'comment on column ST_VIEW_FIELD.table_key is ''外键,table.table_key''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_name is ''字段名称''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_prefix is ''查询前缀|多表关联时, 用于区分同名字段''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_text is ''字段中文名称''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_title is ''字段提示|显示在界面上,供用户参考''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_type is ''精简数据类型|string、datetime、number''';
	execute immediate 'comment on column ST_VIEW_FIELD.datatype is ''物理字段类型|数据库中的实际数据类型，与数据库有关''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_length is ''字段长度,''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_pkey is ''是否主键字段''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_identity is ''是否自增量字段''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_updatable is ''是否允许更新|例如计算列''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_editable is ''允许手工编辑''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_default is ''默认值|新建记录时自动填充''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_grid_control is ''网格控件类型''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_grid_format is ''网格界面格式''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_align is ''对齐方向''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_pixel_width is ''网格宽度''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_input_format is ''输入界面格式''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_validation_key is ''field_validation.key|字段值校验规则''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_control_type is ''界面控件类型''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_query_type is ''查询类型|文本输入、选择框、日期空间、下拉框、树、自定义窗口等''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_query_key is ''field_query.key''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_query_source is ''数据源字符串或SQL语句|如果是有query_key的情况，表示为条件语句''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_query_order is ''查询序号''';
	execute immediate 'comment on column ST_VIEW_FIELD.field_remark is ''字段说明|供程序员参考''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_VIEW_FIELD');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_FIELD ADD CONSTRAINT PK_ST_VIEW_FIELD PRIMARY KEY(field_name,view_key)';
	END IF; 
	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('IX_ST_VIEW_FIELD_view_key');
	IF (num1 = 0) THEN 
		execute immediate 'CREATE INDEX IX_ST_VIEW_FIELD_view_key on ST_VIEW_FIELD(view_key)';
	END IF; 
END;
/ 

-- TABLE: ST_VIEW_TREE; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('ST_VIEW_TREE');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE ST_VIEW_TREE ( 
					view_key VARCHAR2(30),
					tree_key VARCHAR2(30),
					view_tree_max_level NUMBER(10),
					view_tree_order NUMBER(10)
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_TREE') AND COLUMN_NAME = upper('view_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_TREE ADD view_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_TREE') AND COLUMN_NAME = upper('tree_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_TREE ADD tree_key VARCHAR2(30) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_TREE') AND COLUMN_NAME = upper('view_tree_max_level');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_TREE ADD view_tree_max_level NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('ST_VIEW_TREE') AND COLUMN_NAME = upper('view_tree_order');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_TREE ADD view_tree_order NUMBER(10) DEFAULT 999  NOT NULL'; 
	END IF;

	execute immediate 'comment on column ST_VIEW_TREE.view_tree_max_level is ''最大节点级数|默认值为0：不限制最大级数''';
	execute immediate 'comment on column ST_VIEW_TREE.view_tree_order is ''树序号''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_ST_VIEW_TREE');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE ST_VIEW_TREE ADD CONSTRAINT PK_ST_VIEW_TREE PRIMARY KEY(tree_key,view_key)';
	END IF; 
END;
/ 

-- TABLE: WT_ALIPAY; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('WT_ALIPAY');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE WT_ALIPAY ( 
					partner VARCHAR2(16),
					seller_id VARCHAR2(16),
					private_key VARCHAR2(1024)
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_ALIPAY') AND COLUMN_NAME = upper('partner');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_ALIPAY ADD partner VARCHAR2(16) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_ALIPAY') AND COLUMN_NAME = upper('seller_id');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_ALIPAY ADD seller_id VARCHAR2(16) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_ALIPAY') AND COLUMN_NAME = upper('private_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_ALIPAY ADD private_key VARCHAR2(1024)'; 
	END IF;

	execute immediate 'comment on column WT_ALIPAY.partner is ''合作身份者ID，以2088开头由16位纯数字组成的字符串''';
	execute immediate 'comment on column WT_ALIPAY.seller_id is ''收款支付宝账号，以2088开头由16位纯数字组成的字符串''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_WT_ALIPAY');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_ALIPAY ADD CONSTRAINT PK_WT_ALIPAY PRIMARY KEY(partner)';
	END IF; 
END;
/ 

-- TABLE: WT_MENU; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('WT_MENU');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE WT_MENU ( 
					service_key VARCHAR2(20),
					menu_key_parent VARCHAR2(20),
					menu_key VARCHAR2(20),
					menu_name VARCHAR2(20),
					menu_type VARCHAR2(20),
					menu_need_oauth NUMBER(10),
					menu_inactive NUMBER(10),
					menu_url VARCHAR2(512),
					menu_order NUMBER(10),
					menu_remark VARCHAR2(100)
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_MENU') AND COLUMN_NAME = upper('service_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_MENU ADD service_key VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_MENU') AND COLUMN_NAME = upper('menu_key_parent');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_MENU ADD menu_key_parent VARCHAR2(20) DEFAULT ''ROOT''  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_MENU') AND COLUMN_NAME = upper('menu_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_MENU ADD menu_key VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_MENU') AND COLUMN_NAME = upper('menu_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_MENU ADD menu_name VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_MENU') AND COLUMN_NAME = upper('menu_type');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_MENU ADD menu_type VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_MENU') AND COLUMN_NAME = upper('menu_need_oauth');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_MENU ADD menu_need_oauth NUMBER(10) DEFAULT 0  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_MENU') AND COLUMN_NAME = upper('menu_inactive');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_MENU ADD menu_inactive NUMBER(10) DEFAULT 0 '; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_MENU') AND COLUMN_NAME = upper('menu_url');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_MENU ADD menu_url VARCHAR2(512)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_MENU') AND COLUMN_NAME = upper('menu_order');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_MENU ADD menu_order NUMBER(10) DEFAULT 9  NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_MENU') AND COLUMN_NAME = upper('menu_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_MENU ADD menu_remark VARCHAR2(100)'; 
	END IF;

	execute immediate 'comment on column WT_MENU.menu_inactive is ''是否禁用|1：禁用，0：启用''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_WT_MENU');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_MENU ADD CONSTRAINT PK_WT_MENU PRIMARY KEY(menu_key,service_key)';
	END IF; 
END;
/ 

-- TABLE: WT_SERVICE; 
DECLARE num1 NUMBER; 
BEGIN 
	SELECT count(1) INTO num1 FROM user_tables WHERE table_name= upper('WT_SERVICE');
	IF (num1 = 0) THEN 
		execute immediate ' 
		CREATE TABLE WT_SERVICE ( 
					service_key VARCHAR2(20),
					service_name VARCHAR2(20),
					app_id VARCHAR2(20),
					app_secret VARCHAR2(32),
					token VARCHAR2(32),
					merchant_id VARCHAR2(12),
					oauth_domain VARCHAR2(50),
					oauth_do VARCHAR2(50),
					transfer_url VARCHAR2(50),
					service_remark VARCHAR2(200)
		)'; 
	END IF; 

	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_SERVICE') AND COLUMN_NAME = upper('service_key');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_SERVICE ADD service_key VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_SERVICE') AND COLUMN_NAME = upper('service_name');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_SERVICE ADD service_name VARCHAR2(20)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_SERVICE') AND COLUMN_NAME = upper('app_id');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_SERVICE ADD app_id VARCHAR2(20) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_SERVICE') AND COLUMN_NAME = upper('app_secret');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_SERVICE ADD app_secret VARCHAR2(32) NOT NULL'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_SERVICE') AND COLUMN_NAME = upper('token');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_SERVICE ADD token VARCHAR2(32)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_SERVICE') AND COLUMN_NAME = upper('merchant_id');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_SERVICE ADD merchant_id VARCHAR2(12)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_SERVICE') AND COLUMN_NAME = upper('oauth_domain');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_SERVICE ADD oauth_domain VARCHAR2(50)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_SERVICE') AND COLUMN_NAME = upper('oauth_do');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_SERVICE ADD oauth_do VARCHAR2(50)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_SERVICE') AND COLUMN_NAME = upper('transfer_url');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_SERVICE ADD transfer_url VARCHAR2(50)'; 
	END IF;
	SELECT count(1) INTO num1 FROM USER_TAB_COLUMNS WHERE table_name = upper('WT_SERVICE') AND COLUMN_NAME = upper('service_remark');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_SERVICE ADD service_remark VARCHAR2(200)'; 
	END IF;

	execute immediate 'comment on column WT_SERVICE.merchant_id is ''商户号''';
	execute immediate 'comment on column WT_SERVICE.oauth_domain is ''网页授权回调域名''';
	execute immediate 'comment on column WT_SERVICE.oauth_do is ''网页授权回调URL''';
	execute immediate 'comment on column WT_SERVICE.transfer_url is ''中转页面''';

	SELECT count(1) INTO num1 FROM USER_INDEXES WHERE index_name = upper('PK_WT_SERVICE');
	IF (num1 = 0) THEN 
		execute immediate 'ALTER TABLE WT_SERVICE ADD CONSTRAINT PK_WT_SERVICE PRIMARY KEY(service_key)';
	END IF; 
END;
/ 

UPDATE ST_SYSTEM SET system_version = 1 WHERE system_key = 'X99';
COMMIT;