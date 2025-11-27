<script setup>
</script>

<template>
  <div class="privacy-page">
    <div class="content-card">
      <h1 class="title">Kebijakan Privasi Ajari</h1>
      <p class="update-date">05 Desember 2021</p>

      <div class="section highlighted">
        <p>Ajari menghormati privasi Anda dan berkomitmen untuk melindungi data pribadi Anda.</p>
      </div>

      <div class="section">
        <h2>Definisi</h2>
        <div class="definition-card">
          <p><strong>Data Pribadi:</strong> Informasi yang dapat mengidentifikasi pengguna secara langsung atau tidak langsung.</p>
        </div>
        <div class="definition-card">
          <p><strong>Layanan:</strong> Aplikasi mobile Ajari untuk Tempat Pendidikan Al-Quran (TPQ).</p>
        </div>
      </div>

      <div class="section highlighted">
        <h2>Informasi yang Kami Kumpulkan</h2>
        <ul>
          <li>Nama pengguna</li>
          <li>Informasi kontak</li>
          <li>Data penggunaan aplikasi</li>
          <li>Informasi perangkat</li>
        </ul>
      </div>

      <div class="section">
        <h2>Penggunaan Data</h2>
        <p>Kami menggunakan data yang dikumpulkan untuk:</p>
        <ul>
          <li>Menyediakan dan memelihara layanan kami</li>
          <li>Memberi tahu Anda tentang perubahan pada layanan kami</li>
          <li>Memberikan dukungan pelanggan</li>
          <li>Mengumpulkan analisis untuk meningkatkan layanan kami</li>
        </ul>
      </div>

      <div class="section highlighted">
        <h2>Keamanan Data</h2>
        <p>Keamanan data Anda penting bagi kami. Kami berusaha menggunakan cara yang dapat diterima secara komersial untuk melindungi data pribadi Anda.</p>
      </div>

      <div class="section">
        <h2>Hubungi Kami</h2>
        <p>Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami melalui aplikasi.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/colors';
@import '../assets/styles/typography';

.privacy-page {
  width: 100%;
  min-height: 100vh;
  background-color: rgba(255, 255, 255, 0.96);
  display: flex;
  justify-content: center;
  padding: 60px 20px;

  .content-card {
    max-width: 800px;
    width: 100%;
    padding: 40px;
    background-color: $white;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    .title {
      font-size: 28px;
      font-weight: $font-bold;
      color: $black;
      margin-bottom: 16px;
    }

    .update-date {
      font-size: 18px;
      font-weight: $font-bold;
      color: $accent-green;
      margin-bottom: 32px;
    }

    .section {
      margin-bottom: 24px;
      color: $black;

      h2 {
        font-size: 22px;
        font-weight: $font-bold;
        margin-bottom: 12px;
        color: $black;
      }

      p {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 12px;
      }

      ul {
        padding-left: 24px;
        margin: 12px 0;

        li {
          font-size: 16px;
          line-height: 1.8;
          margin-bottom: 8px;
        }
      }

      &.highlighted {
        background-color: rgba(76, 175, 80, 0.1);
        padding: 20px;
        border-radius: 8px;
        border-left: 4px solid $accent-green;
      }
    }

    .definition-card {
      background-color: rgba(0, 0, 0, 0.05);
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 12px;

      p {
        margin: 0;
        font-size: 16px;
        line-height: 1.6;
      }
    }
  }
}

@media (max-width: 1000px) {
  .privacy-page {
    .content-card {
      max-width: 600px;
    }
  }
}

@media (max-width: 800px) {
  .privacy-page {
    .content-card {
      max-width: 100%;
      padding: 24px;
    }
  }
}
</style>
