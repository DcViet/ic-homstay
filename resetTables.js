"use strict";

const { sequelize } = require('./models');  

(async () => {
  const queryInterface = sequelize.getQueryInterface();
  
  // Thực hiện câu lệnh SQL để xóa dữ liệu và đặt lại giá trị tự động tăng
  await queryInterface.sequelize.query(`
    DO $$
    DECLARE 
        r RECORD;
    BEGIN
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') 
        LOOP
            EXECUTE 'TRUNCATE TABLE "' || r.tablename || '" RESTART IDENTITY CASCADE;';
        END LOOP;
    END $$;
  `);

  console.log("All tables truncated and IDs reset.");
  
  // Đóng kết nối sau khi hoàn thành các thao tác
  await sequelize.close();
})();
