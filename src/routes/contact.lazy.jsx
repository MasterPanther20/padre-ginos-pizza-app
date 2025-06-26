import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: function (formData) {
      return postContact(
        formData.get("name"),
        formData.get("email"),
        formData.get("message"),
      );
    },
  });

  const isPending = mutation.isPending;

  return (
    <div className="contact">
      <h2>Contact</h2>
      {mutation.isSuccess ? (
        <h3>Submitted!</h3>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            mutation.mutate(formData);
          }}
        >
          <ContactInput
            name="name"
            type="text"
            placeholder="Name"
            disabled={isPending}
          />
          <ContactInput
            name="email"
            type="email"
            placeholder="Email"
            disabled={isPending}
          />
          <textarea
            name="message"
            placeholder="Message"
            disabled={isPending}
          ></textarea>
          <button disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}

function ContactInput(props) {
  return (
    <input
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      disabled={props.disabled}
    />
  );
}
