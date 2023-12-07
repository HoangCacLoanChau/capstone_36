-- CreateTable
CREATE TABLE `nguoi_dung` (
    `nguoi_dung_id` INTEGER NOT NULL,
    `email` VARCHAR(191) NULL,
    `mat_khau` VARCHAR(191) NULL,
    `ho_ten` VARCHAR(191) NULL,
    `tuoi` VARCHAR(191) NULL,
    `anh_dai_dien` VARCHAR(191) NULL,

    PRIMARY KEY (`nguoi_dung_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hinh_anh` (
    `hinh_id` INTEGER NOT NULL,
    `ten_hinh` VARCHAR(191) NULL,
    `duong_dan` VARCHAR(191) NULL,
    `mo_ta` VARCHAR(191) NULL,
    `nguoi_dung_id` INTEGER NOT NULL,

    PRIMARY KEY (`hinh_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `luu_anh` (
    `ngay_luu` DATETIME(3) NULL,
    `nguoi_dung_id` INTEGER NOT NULL,
    `hinh_id` INTEGER NOT NULL,

    PRIMARY KEY (`nguoi_dung_id`, `hinh_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `binh_luan` (
    `binh_luan_id` INTEGER NOT NULL,
    `ngay_binh_luan` DATETIME(3) NULL,
    `noi_dung` VARCHAR(191) NULL,
    `nguoi_dung_id` INTEGER NOT NULL,
    `hinh_id` INTEGER NOT NULL,

    PRIMARY KEY (`binh_luan_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hinh_anh` ADD CONSTRAINT `hinh_anh_nguoi_dung_id_fkey` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung`(`nguoi_dung_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `luu_anh` ADD CONSTRAINT `luu_anh_nguoi_dung_id_fkey` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung`(`nguoi_dung_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `luu_anh` ADD CONSTRAINT `luu_anh_hinh_id_fkey` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh`(`hinh_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `binh_luan` ADD CONSTRAINT `binh_luan_nguoi_dung_id_fkey` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung`(`nguoi_dung_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `binh_luan` ADD CONSTRAINT `binh_luan_hinh_id_fkey` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh`(`hinh_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
