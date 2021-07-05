<style>
  main {
    font-family: sans-serif;
    text-align: center;
  }
</style>

<script lang="ts">
  const parameter = new URLSearchParams(window.location.search);
  const webmailId = parameter.get('webmailId');
</script>

<main>
  <div class="verifyContainer">
    <h2 class="verifyTitle">Verification Link Sent!</h2>
    <p class="verifyContent">
      Kindly check <span class="webmailId">{webmailId}</span> for the confirmation link.<br
      /> You need to confirm your webmail account in order to complete the signing up process.
    </p>
  </div>
</main>
