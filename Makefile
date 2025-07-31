NAME = ft_turing
ENTRY_POINT = bin/ft_turing.js lib/*
PERMISSIONS = --allow-all

all: $(NAME)

$(NAME): $(ENTRY_POINT)
	deno compile $(PERMISSIONS) $(ENTRY_POINT)

run: all
	@./ft_turing machines/palindrome.json "0" || true

clean:
	rm -f $(NAME)
c: clean

re: clean all
r: re

.PHONY: all clean c re r
