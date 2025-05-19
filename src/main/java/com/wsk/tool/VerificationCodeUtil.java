package com.wsk.tool;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Base64;
import java.util.Random;

public class VerificationCodeUtil {
    private static final String CHARACTERS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final int CODE_LENGTH = 4;
    private static final int IMAGE_WIDTH = 100;
    private static final int IMAGE_HEIGHT = 40;

    public static class VerificationCode {
        private final String code;
        private final String imageBase64;

        public VerificationCode(String code, String imageBase64) {
            this.code = code;
            this.imageBase64 = imageBase64;
        }

        public String getCode() {
            return code;
        }

        public String getImageBase64() {
            return imageBase64;
        }
    }

    public static VerificationCode generateVerificationCode() {
        // 生成随机验证码
        StringBuilder code = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < CODE_LENGTH; i++) {
            code.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
        }

        // 创建图片
        BufferedImage image = new BufferedImage(IMAGE_WIDTH, IMAGE_HEIGHT, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = image.createGraphics();

        // 设置背景色
        g2d.setColor(Color.WHITE);
        g2d.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);

        // 添加干扰线
        g2d.setColor(Color.LIGHT_GRAY);
        for (int i = 0; i < 20; i++) {
            int x1 = random.nextInt(IMAGE_WIDTH);
            int y1 = random.nextInt(IMAGE_HEIGHT);
            int x2 = random.nextInt(IMAGE_WIDTH);
            int y2 = random.nextInt(IMAGE_HEIGHT);
            g2d.drawLine(x1, y1, x2, y2);
        }

        // 绘制验证码
        g2d.setColor(Color.BLACK);
        g2d.setFont(new Font("Arial", Font.BOLD, 24));
        FontMetrics fontMetrics = g2d.getFontMetrics();
        int totalWidth = fontMetrics.stringWidth(code.toString());
        int startX = (IMAGE_WIDTH - totalWidth) / 2;
        int startY = ((IMAGE_HEIGHT - fontMetrics.getHeight()) / 2) + fontMetrics.getAscent();

        for (int i = 0; i < code.length(); i++) {
            g2d.setColor(new Color(random.nextInt(100), random.nextInt(100), random.nextInt(100)));
            g2d.drawString(String.valueOf(code.charAt(i)), startX + (i * totalWidth/code.length()), startY);
        }

        g2d.dispose();

        // 将图片转换为Base64
        String imageBase64;
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(image, "png", baos);
            byte[] imageBytes = baos.toByteArray();
            imageBase64 = Base64.getEncoder().encodeToString(imageBytes);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate verification code image", e);
        }

        return new VerificationCode(code.toString(), imageBase64);
    }
}